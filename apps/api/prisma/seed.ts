// api/prisma/seed.ts
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create the Prisma adapter
const adapter = new PrismaPg(pool);

// Instantiate PrismaClient with the adapter
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding EngineeringOS...\n');

  // ------------------------------------------------------------------------
  // 1. Admin Users (two administrators)
  // ------------------------------------------------------------------------
  const adminEmails = [
    'derek_admin@engineeringos.dev',
    'kingsley_admin@engineeringos.dev',
  ];
  const plainPassword = 'EngineeringOS123';
  const hashedPassword = await argon2.hash(plainPassword);

  const adminUsers = [];
  for (const [index, email] of adminEmails.entries()) {
    const firstName = index === 0 ? 'Derek' : 'Kingsley';
    const lastName = index === 0 ? 'Admin' : 'Admin';
    const displayName = `${firstName} ${lastName}`;

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        // Always update password hash (in case it changes) and other fields
        passwordHash: hashedPassword,
        firstName,
        lastName,
        displayName,
        jobTitle: 'Platform Administrator',
        locale: 'EN',
        timezone: 'UTC',
        emailVerifiedAt: new Date(),
        isActive: true,
      },
      create: {
        email,
        passwordHash: hashedPassword,
        firstName,
        lastName,
        displayName,
        jobTitle: 'Platform Administrator',
        locale: 'EN',
        timezone: 'UTC',
        emailVerifiedAt: new Date(),
        isActive: true,
      },
    });
    adminUsers.push(user);
    console.log(`Admin user ${email} created/updated (ID: ${user.id})`);
  }

  // ------------------------------------------------------------------------
  // 2. User Preferences for each admin
  // ------------------------------------------------------------------------
  for (const user of adminUsers) {
    await prisma.userPreference.upsert({
      where: { userId: user.id },
      update: {
        theme: 'SYSTEM',
        language: 'EN',
        timezone: 'UTC',
        dateFormat: 'YYYY_MM_DD',
        timeFormat: 'TWENTY_FOUR_HOUR',
        emailNotifications: true,
        pushNotifications: true,
        inAppNotifications: true,
        dashboardLayout: { sidebarCollapsed: false, widgets: [] },
      },
      create: {
        userId: user.id,
        theme: 'SYSTEM',
        language: 'EN',
        timezone: 'UTC',
        dateFormat: 'YYYY_MM_DD',
        timeFormat: 'TWENTY_FOUR_HOUR',
        emailNotifications: true,
        pushNotifications: true,
        inAppNotifications: true,
        dashboardLayout: { sidebarCollapsed: false, widgets: [] },
      },
    });
    console.log(`Preferences for ${user.email} created/updated`);
  }

  // ------------------------------------------------------------------------
  // 3. Organization (owned by the first admin)
  // ------------------------------------------------------------------------
  const orgData = {
    name: 'EngineeringOS Demo',
    slug: 'engineeringos-demo',
    description: 'Default development workspace',
    industry: 'Software Engineering',
    website: 'https://engineeringos.dev',
    size: 'SMALL',
    metadata: { type: 'demo' },
    ownerId: adminUsers[0].id,
  };

  const organization = await prisma.organization.upsert({
    where: { slug: orgData.slug },
    update: orgData,
    create: orgData,
  });
  console.log(
    `Organization "${organization.name}" created/updated (ID: ${organization.id})`,
  );

  // ------------------------------------------------------------------------
  // 4. Organization Settings
  // ------------------------------------------------------------------------
  await prisma.organizationSettings.upsert({
    where: { organizationId: organization.id },
    update: {
      timezone: 'UTC',
      currency: 'GHS',
      defaultRole: 'MEMBER',
      weekStartsOn: 1,
      allowGuestAccess: false,
      metadata: {},
    },
    create: {
      organizationId: organization.id,
      timezone: 'UTC',
      currency: 'GHS',
      defaultRole: 'MEMBER',
      weekStartsOn: 1,
      allowGuestAccess: false,
      metadata: {},
    },
  });
  console.log(
    `Organization settings for "${organization.name}" created/updated`,
  );

  // ------------------------------------------------------------------------
  // 5. Memberships (both admins as OWNERs, status ACTIVE)
  // ------------------------------------------------------------------------
  for (const user of adminUsers) {
    await prisma.membership.upsert({
      where: {
        organizationId_userId: {
          organizationId: organization.id,
          userId: user.id,
        },
      },
      update: {
        role: 'OWNER',
        status: 'ACTIVE',
        joinedAt: new Date(),
      },
      create: {
        organizationId: organization.id,
        userId: user.id,
        role: 'OWNER',
        status: 'ACTIVE',
        joinedAt: new Date(),
      },
    });
    console.log(
      `Membership for ${user.email} in "${organization.name}" created/updated`,
    );
  }

  // ------------------------------------------------------------------------
  // 6. API Key (one sample key, regenerated on each seed)
  // ------------------------------------------------------------------------
  const apiKeyName = 'Development API Key';
  // Generate a new random key
  const plaintextKey = crypto.randomBytes(32).toString('hex');
  const prefix = plaintextKey.substring(0, 8);
  const keyHash = await argon2.hash(plaintextKey);

  // Try to find existing key with the same name for this organization
  const existingKey = await prisma.apiKey.findFirst({
    where: {
      organizationId: organization.id,
      name: apiKeyName,
    },
  });

  let apiKey;
  if (existingKey) {
    apiKey = await prisma.apiKey.update({
      where: { id: existingKey.id },
      data: {
        prefix,
        keyHash,
        description: 'Default API key for local development',
        scopes: ['platform:*'],
        // expiresAt and revokedAt remain null (or keep existing)
      },
    });
  } else {
    apiKey = await prisma.apiKey.create({
      data: {
        organizationId: organization.id,
        createdById: adminUsers[0].id,
        name: apiKeyName,
        description: 'Default API key for local development',
        prefix,
        keyHash,
        scopes: ['platform:*'],
      },
    });
  }

  console.log(`API key "${apiKey.name}" created/updated (ID: ${apiKey.id})`);
  console.log(`Plaintext API key: ${plaintextKey}`);
  console.log(`   (Store this securely – it will not be shown again)\n`);

  // ------------------------------------------------------------------------
  // 7. Welcome Notification (for the first admin)
  // ------------------------------------------------------------------------
  const notificationTitle = 'Welcome to EngineeringOS';
  const existingNotification = await prisma.notification.findFirst({
    where: {
      userId: adminUsers[0].id,
      title: notificationTitle,
      type: 'SYSTEM',
    },
  });

  if (!existingNotification) {
    await prisma.notification.create({
      data: {
        userId: adminUsers[0].id,
        organizationId: organization.id,
        type: 'SYSTEM',
        title: notificationTitle,
        message:
          'Your EngineeringOS workspace has been successfully initialized.',
      },
    });
    console.log(`Welcome notification created for ${adminUsers[0].email}`);
  } else {
    console.log(`Welcome notification already exists, skipping.`);
  }

  // ------------------------------------------------------------------------
  // Done
  // ------------------------------------------------------------------------
  console.log('\n Seed completed successfully.');
}

// --------------------------------------------------------------------------
// Execute and handle errors / cleanup
// --------------------------------------------------------------------------
main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

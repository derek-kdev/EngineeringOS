// api/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import materialsData from './seeds/materials.json';

const materials = materialsData.materials;

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
        updatedAt: new Date(),
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
        updatedAt: new Date(),
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
        updatedAt: new Date(),
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
    updatedAt: new Date(),
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
      updatedAt: new Date(),
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
        updatedAt: new Date(),
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
        updatedAt: new Date(),
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
        updatedAt: new Date(),
      },
    });
    console.log(`Welcome notification created for ${adminUsers[0].email}`);
  } else {
    console.log(`Welcome notification already exists, skipping.`);
  }


  // ------------------------------------------------------------------------
  // 8. Engineering Materials Database
  // ------------------------------------------------------------------------

  console.log(`\nLoading ${materials.length} engineering materials...`);

  await prisma.material.createMany({
    data: materials.map((material) => ({
      ...material,
      applications: material.applications,
    })),
    skipDuplicates: true,
  });

  console.log('Materials inserted successfully');


  // ------------------------------------------------------------------------
  // 9. Global Search Index for Materials
  // ------------------------------------------------------------------------

  console.log('Creating material search indexes...');

  const searchRecords = materials.map((material) => ({
    entityType: 'MATERIAL',
    entityId: material.id,
    title: material.name,
    description: material.description,
    visibility: 'GLOBAL',
    metadata: {
      category: material.category,
      subcategory: material.subcategory,
      symbol: material.symbol,
      properties: {
        density: material.density,
        youngsModulus: material.youngsModulus,
        yieldStrength: material.yieldStrength,
        ultimateStrength: material.ultimateStrength,
        thermalConductivity: material.thermalConductivity,
        electricalConductivity: material.electricalConductivity,
        meltingPoint: material.meltingPoint,
      },
    },
  }));

  await prisma.searchIndex.createMany({
    data: searchRecords,
    skipDuplicates: true,
  });

  console.log('Material search indexing completed');

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

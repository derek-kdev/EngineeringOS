import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import path from 'path';

// 1. Load env from apps/api/.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 2. Create a PostgreSQL connection pool - same as seed.ts
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 3. Create the Prisma adapter
const adapter = new PrismaPg(pool);

// 4. Instantiate PrismaClient with the adapter
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Promoting users to ADMIN...\n');

  const emailsToPromote = [
    'derek_admin@engineeringos.dev',     
    'kingsley_admin@engineeringos.dev',   
  ];

  const result = await prisma.user.updateMany({
    where: {
      email: { in: emailsToPromote }
    },
    data: {
      role: 'ADMIN' // using string is fine. Or import { Role } and use Role.ADMIN
    }
  });

  if (result.count === 0) {
    console.log('⚠️  No users found with those emails');
  } else {
    console.log(`✅ Promoted ${result.count} users to ADMIN`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end(); // close the pool
    await prisma.$disconnect();
  });
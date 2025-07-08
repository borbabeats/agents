import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './connection.ts';
import { env } from '../env.ts';

async function runMigrations() {
  console.log('Running migrations...');
  
  await migrate(db, { migrationsFolder: 'src/db/migrations' });
  
  console.log('Migrations completed!');
  process.exit(0);
}

runMigrations().catch((err) => {
  console.error('Migration failed!');
  console.error(err);
  process.exit(1);
});

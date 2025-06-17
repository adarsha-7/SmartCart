-- AlterTable
ALTER TABLE "user" ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'manual',
ALTER COLUMN "passwordHash" DROP NOT NULL;

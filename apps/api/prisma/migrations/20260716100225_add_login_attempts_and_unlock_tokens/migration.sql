-- CreateTable
CREATE TABLE "LoginAttempt" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lockedUntil" TIMESTAMP(3),
    "lockCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoginAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountUnlockToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountUnlockToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoginAttempt_email_key" ON "LoginAttempt"("email");

-- CreateIndex
CREATE INDEX "LoginAttempt_email_idx" ON "LoginAttempt"("email");

-- CreateIndex
CREATE INDEX "LoginAttempt_lockedUntil_idx" ON "LoginAttempt"("lockedUntil");

-- CreateIndex
CREATE UNIQUE INDEX "AccountUnlockToken_tokenHash_key" ON "AccountUnlockToken"("tokenHash");

-- CreateIndex
CREATE INDEX "AccountUnlockToken_userId_idx" ON "AccountUnlockToken"("userId");

-- CreateIndex
CREATE INDEX "AccountUnlockToken_expiresAt_idx" ON "AccountUnlockToken"("expiresAt");

-- AddForeignKey
ALTER TABLE "AccountUnlockToken" ADD CONSTRAINT "AccountUnlockToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

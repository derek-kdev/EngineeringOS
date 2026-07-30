export const LogEvents = {
  // Authentication
  AUTH_REGISTER: 'auth.register',
  AUTH_LOGIN: 'auth.login',
  AUTH_LOGOUT: 'auth.logout',
  AUTH_REFRESH: 'auth.refresh',
  AUTH_PASSWORD_RESET_REQUEST: 'auth.password.reset.request',
  AUTH_PASSWORD_RESET_SUCCESS: 'auth.password.reset.success',
  AUTH_PASSWORD_CHANGE: 'auth.password.change',
  AUTH_EMAIL_VERIFICATION_REQUEST: 'auth.email.verification.request',
  AUTH_EMAIL_VERIFICATION_SUCCESS: 'auth.email.verification.success',

  // Users
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_ACTIVATED: 'user.activated',
  USER_DEACTIVATED: 'user.deactivated',
  USER_DELETED: 'user.deleted',
  USER_PASSWORD_UPDATED: 'user.password.updated',

  // Organizations
  ORGANIZATION_CREATED: 'organization.created',
  ORGANIZATION_UPDATED: 'organization.updated',
  ORGANIZATION_DELETED: 'organization.deleted',
  ORGANIZATION_VIEWED: 'organization.viewed',
  ORGANIZATION_MEMBER_ADDED: 'organization.member.added',
  ORGANIZATION_MEMBER_REMOVED: 'organization.member.removed',

  // Memberships
  MEMBERSHIP_CREATED: 'membership.created',
  MEMBERSHIP_UPDATED: 'membership.updated',
  MEMBERSHIP_REMOVED: 'membership.removed',
  MEMBERSHIP_ROLE_UPDATED: 'membership.role.updated',

  // Invitations
  INVITATION_SENT: 'invitation.sent',
  INVITATION_ACCEPTED: 'invitation.accepted',
  INVITATION_DECLINED: 'invitation.declined',

  // Email
  EMAIL_VERIFICATION_SENT: 'email.verification.sent',
  EMAIL_VERIFICATION_FAILED: 'email.verification.failed',
  EMAIL_VERIFICATION_RESENT: 'email.verification.resent',
  EMAIL_PASSWORD_RESET_SENT: 'email.password.reset.sent',
  EMAIL_PASSWORD_RESET_FAILED: 'email.password.reset.failed',

  // Sessions
  SESSION_CREATED: 'session.created',
  SESSION_REVOKED: 'session.revoked',
  SESSION_REVOKED_ALL: 'session.revoked.all',
  SESSION_CLEANUP: 'session.cleanup',

  // Password Reset
  PASSWORD_RESET_REQUESTED: 'password.reset.requested',
  PASSWORD_RESET_COMPLETED: 'password.reset.completed',
  PASSWORD_RESET_FAILED: 'password.reset.failed',

  // Tasks / Projects
  TASK_CREATED: 'task.created',
  TASK_UPDATED: 'task.updated',
  TASK_COMPLETED: 'task.completed',

  // Notifications & Emails
  NOTIFICATION_SENT: 'notification.sent',
  EMAIL_SENT: 'email.sent',
  EMAIL_FAILED: 'email.failed',

  // Background Jobs
  BACKGROUND_JOB_STARTED: 'background-job.started',
  BACKGROUND_JOB_COMPLETED: 'background-job.completed',
  BACKGROUND_JOB_FAILED: 'background-job.failed',

  // External APIs
  EXTERNAL_API_CALL: 'external-api.called',
  EXTERNAL_API_FAILED: 'external-api.failed',

  // Database
  DATABASE_CONNECTING: 'database.connecting',
  DATABASE_CONNECTED: 'database.connected',
  DATABASE_CONNECTION_FAILED: 'database.connection.failed',
  DATABASE_DISCONNECTED: 'database.disconnected',

  // Prisma
  PRISMA_QUERY: 'prisma.query',
  PRISMA_INFO: 'prisma.info',
  PRISMA_WARN: 'prisma.warn',
  PRISMA_ERROR: 'prisma.error',
} as const;

export type LogEvent = (typeof LogEvents)[keyof typeof LogEvents];

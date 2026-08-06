// constants/event-names.constants.ts

export const EventNames = {
  //User Events
  USER_REGISTERED: 'user.registered',
  USER_LOGGED_IN: 'user.logged_in',
  USER_LOGGED_OUT: 'user.logged_out',

  // Password Events
  PASSWORD_CHANGED: 'user.password_changed',
  PASSWORD_RESET_REQUESTED: 'user.password_reset_requested',
  PASSWORD_RESET_COMPLETED: 'user.password_reset_completed',

  // Email Event
  EMAIL_VERIFIED: 'user.email_verified',

  // Organization Events
  ORGANIZATION_CREATED: 'organization.created',
  ORGANIZATION_UPDATED: 'organization.updated',
  ORGANIZATION_DELETED: 'organization.deleted',

  // Invitation Events
  INVITATION_CREATED: 'invitation.created',
  INVITATION_ACCEPTED: 'invitation.accepted',
  INVITATION_DECLINED: 'invitation.declined',
  INVITATION_EXPIRED: 'invitation.expired',

  // Membership Events
  MEMBERSHIP_INVITED: 'membership.invited',
  MEMBERSHIP_ACCEPTED: 'membership_accepted',
  MEMBERSHIP_REMOVED: 'membership_removed',
  MEMBERSHIP_ROLE_CHANGED: 'membership_role_changed',
} as const;

export type EventName = (typeof EventNames)[keyof typeof EventNames];

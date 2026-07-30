import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';

interface MembershipInvitedPayload {
  membershipId?: string; // if membership already exists (re-invite), or null
  organizationId: string;
  userId?: string; // if user exists
  email: string;
  invitedByUserId: string;
  role: string;
}

export class MembershipInvitedEvent extends BaseApplicationEvent<MembershipInvitedPayload> {
  static readonly eventName = 'membership.invited';

  constructor(params: {
    payload: MembershipInvitedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: MembershipInvitedEvent.eventName });
  }
}

import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';

interface MembershipRoleChangedPayload {
  membershipId: string;
  organizationId: string;
  userId: string;
  changedByUserId: string;
  previousRole: string;
  newRole: string;
}

export class MembershipRoleChangedEvent extends BaseApplicationEvent<MembershipRoleChangedPayload> {
  static readonly eventName = 'membership.role_changed';

  constructor(params: {
    payload: MembershipRoleChangedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: MembershipRoleChangedEvent.eventName });
  }
}

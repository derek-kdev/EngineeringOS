import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
import { EventNames } from '../../events/constants/event-names.constants';

interface MembershipRoleChangedPayload {
  membershipId: string;
  organizationId: string;
  userId: string;
  email?: string;
  changedByUserId: string;
  previousRole: string;
  newRole: string;
}

export class MembershipRoleChangedEvent extends BaseApplicationEvent<MembershipRoleChangedPayload> {
  constructor(params: {
    payload: MembershipRoleChangedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({
      eventName: EventNames.MEMBERSHIP_ROLE_CHANGED,
      ...params,
    });
  }
}

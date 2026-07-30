import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';

interface MembershipRemovedPayload {
  membershipId: string;
  organizationId: string;
  userId: string;
  removedByUserId: string;
  reason?: string;
}

export class MembershipRemovedEvent extends BaseApplicationEvent<MembershipRemovedPayload> {
  static readonly eventName = 'membership.removed';

  constructor(params: {
    payload: MembershipRemovedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: MembershipRemovedEvent.eventName });
  }
}

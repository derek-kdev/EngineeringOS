import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
interface MembershipAcceptedPayload {
  membershipId: string;
  organizationId: string;
  userId: string;
  role: string;
}

export class MembershipAcceptedEvent extends BaseApplicationEvent<MembershipAcceptedPayload> {
  static readonly eventName = 'membership.accepted';

  constructor(params: {
    payload: MembershipAcceptedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: MembershipAcceptedEvent.eventName });
  }
}

import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
import { EventNames } from '../../events/constants/event-names.constants';

interface MembershipAcceptedPayload {
  membershipId: string;
  organizationId: string;
  userId: string;
  email?: string;
  role: string;
}

export class MembershipAcceptedEvent extends BaseApplicationEvent<MembershipAcceptedPayload> {
  constructor(params: {
    payload: MembershipAcceptedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({
      eventName: EventNames.MEMBERSHIP_ACCEPTED,
      ...params,
    });
  }
}

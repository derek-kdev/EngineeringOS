import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
import { EventNames } from '../../events/constants/event-names.constants';

interface InvitationExpiredPayload {
  invitationId: string;
  organizationId: string;
  email: string;
  userId: string;
}

export class InvitationExpiredEvent extends BaseApplicationEvent<InvitationExpiredPayload> {
  constructor(params: {
    payload: InvitationExpiredPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({
      eventName: EventNames.INVITATION_EXPIRED,
      ...params,
    });
  }
}

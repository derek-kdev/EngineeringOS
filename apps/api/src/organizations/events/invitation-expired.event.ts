import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';

interface InvitationExpiredPayload {
  invitationId: string;
  organizationId: string;
  email: string;
}

export class InvitationExpiredEvent extends BaseApplicationEvent<InvitationExpiredPayload> {
  static readonly eventName = 'invitation.expired';

  constructor(params: {
    payload: InvitationExpiredPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: InvitationExpiredEvent.eventName });
  }
}

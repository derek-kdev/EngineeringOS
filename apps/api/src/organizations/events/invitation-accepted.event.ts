import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';

interface InvitationAcceptedPayload {
  invitationId: string;
  organizationId: string;
  email: string;
  userId: string;
}

export class InvitationAcceptedEvent extends BaseApplicationEvent<InvitationAcceptedPayload> {
  static readonly eventName = 'invitation.accepted';

  constructor(params: {
    payload: InvitationAcceptedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: InvitationAcceptedEvent.eventName });
  }
}

import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';

interface InvitationDeclinedPayload {
  invitationId: string;
  organizationId: string;
  email: string;
  userId: string;
}

export class InvitationDeclinedEvent extends BaseApplicationEvent<InvitationDeclinedPayload> {
  static readonly eventName = 'invitation.declined';

  constructor(params: {
    payload: InvitationDeclinedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: InvitationDeclinedEvent.eventName });
  }
}

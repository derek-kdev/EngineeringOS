import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';

interface InvitationCreatedPayload {
  invitationId: string;
  organizationId: string;
  email: string;
  invitedByUserId: string;
  role: string;
  expiresAt: Date;
}

export class InvitationCreatedEvent extends BaseApplicationEvent<InvitationCreatedPayload> {
  static readonly eventName = 'invitation.created';

  constructor(params: {
    payload: InvitationCreatedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: InvitationCreatedEvent.eventName });
  }
}

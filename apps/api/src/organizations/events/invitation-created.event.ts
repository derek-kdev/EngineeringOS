import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
import { EventNames } from '../../events/constants/event-names.constants';

interface InvitationCreatedPayload {
  invitationId: string;
  organizationId: string;
  email: string;
  invitedByUserId: string;
  role: string;
  expiresAt: Date;
}

export class InvitationCreatedEvent extends BaseApplicationEvent<InvitationCreatedPayload> {
  constructor(params: {
    payload: InvitationCreatedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({
      eventName: EventNames.INVITATION_CREATED,
      ...params,
    });
  }
}

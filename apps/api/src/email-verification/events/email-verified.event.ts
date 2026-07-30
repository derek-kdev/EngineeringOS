import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
interface EmailVerifiedPayload {
  userId: string;
  email: string;
}

export class EmailVerifiedEvent extends BaseApplicationEvent<EmailVerifiedPayload> {
  static readonly eventName = 'email.verified';

  constructor(params: {
    payload: EmailVerifiedPayload;
    id?: string;
    occurredAt?: Date;
    userId?: string;
    email?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: EmailVerifiedEvent.eventName });
  }
}

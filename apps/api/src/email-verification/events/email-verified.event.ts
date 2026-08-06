import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
import { EventNames } from '../../events/constants/event-names.constants';

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
    super({
      eventName: EventNames.EMAIL_VERIFIED,
      ...params,
    });
  }
}

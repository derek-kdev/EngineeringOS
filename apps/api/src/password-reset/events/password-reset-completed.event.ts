import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
import { EventNames } from '../../events/constants/event-names.constants';

interface PasswordResetCompletedPayload {
  userId: string;
  email: string;
}

export class PasswordResetCompletedEvent extends BaseApplicationEvent<PasswordResetCompletedPayload> {
  constructor(params: {
    payload: PasswordResetCompletedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({
      eventName: EventNames.PASSWORD_RESET_COMPLETED,
      ...params,
    });
  }
}

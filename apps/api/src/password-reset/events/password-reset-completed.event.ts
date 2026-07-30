import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
interface PasswordResetCompletedPayload {
  userId: string;
}

export class PasswordResetCompletedEvent extends BaseApplicationEvent<PasswordResetCompletedPayload> {
  static readonly eventName = 'password.reset_completed';

  constructor(params: {
    payload: PasswordResetCompletedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: PasswordResetCompletedEvent.eventName });
  }
}

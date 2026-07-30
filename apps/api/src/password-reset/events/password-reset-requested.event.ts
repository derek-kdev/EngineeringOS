import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
interface PasswordResetRequestedPayload {
  userId: string;
}

export class PasswordResetRequestedEvent extends BaseApplicationEvent<PasswordResetRequestedPayload> {
  static readonly eventName = 'password.reset_requested';

  constructor(params: {
    payload: PasswordResetRequestedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: PasswordResetRequestedEvent.eventName });
  }
}

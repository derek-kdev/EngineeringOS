import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
interface PasswordChangedPayload {
  userId: string;
}

export class PasswordChangedEvent extends BaseApplicationEvent<PasswordChangedPayload> {
  static readonly eventName = 'password.changed';

  constructor(params: {
    payload: PasswordChangedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: PasswordChangedEvent.eventName });
  }
}

import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';

interface UserRegisteredPayload {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class UserRegisteredEvent extends BaseApplicationEvent<UserRegisteredPayload> {
  static readonly eventName = 'user.registered';
  constructor(params: {
    payload: UserRegisteredPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: UserRegisteredEvent.eventName });
  }
}

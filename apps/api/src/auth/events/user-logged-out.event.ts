import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
import { BaseApplicationEvent } from '../../events/base/application-event.base';

interface UserLoggedOutPayload {
  userId: string;
  email?: string;
  ipAddress?: string;
  userAgent?: string;
}

export class UserLoggedOutEvent extends BaseApplicationEvent<UserLoggedOutPayload> {
  static readonly eventName = 'user.logged_out';

  constructor(params: {
    payload: UserLoggedOutPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: UserLoggedOutEvent.eventName });
  }
}

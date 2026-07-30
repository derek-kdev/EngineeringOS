import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
interface UserLoggedInPayload {
  userId: string;
  email: string;
  ipAddress?: string;
  userAgent?: string;
}

export class UserLoggedInEvent extends BaseApplicationEvent<UserLoggedInPayload> {
  static readonly eventName = 'user.logged_in';

  constructor(params: {
    payload: UserLoggedInPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: UserLoggedInEvent.eventName });
  }
}

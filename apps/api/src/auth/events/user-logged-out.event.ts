import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventNames } from '../../events/constants/event-names.constants';

interface UserLoggedOutPayload {
  userId: string;
  email?: string;
}

export class UserLoggedOutEvent extends BaseApplicationEvent<UserLoggedOutPayload> {
  constructor(params: {
    payload: UserLoggedOutPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({
      eventName: EventNames.USER_LOGGED_OUT,
      ...params,
    });
  }
}

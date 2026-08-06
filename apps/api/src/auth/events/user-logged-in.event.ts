import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
import { EventNames } from '../../events/constants/event-names.constants';

interface UserLoggedInPayload {
  userId: string;
  email: string;
}

export class UserLoggedInEvent extends BaseApplicationEvent<UserLoggedInPayload> {
  constructor(params: {
    payload: UserLoggedInPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({
      eventName: EventNames.USER_LOGGED_IN,
      ...params,
    });
  }
}

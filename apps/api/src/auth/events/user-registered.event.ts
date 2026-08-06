import { EventMetadata } from '@/events/interfaces/event-metadata.interface';
import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventNames } from '../../events/constants/event-names.constants';

export interface UserRegisteredPayload {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}
export class UserRegisteredEvent extends BaseApplicationEvent<UserRegisteredPayload> {
  constructor(params: {
    payload: UserRegisteredPayload;
    id?: string;
    occurredAt?: Date;
    userId?: string;
    organizationId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({
      eventName: EventNames.USER_REGISTERED,
      ...params,
    });
  }
}

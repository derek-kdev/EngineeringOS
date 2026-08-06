import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
import { EventNames } from '../../events/constants/event-names.constants';

interface PasswordChangedPayload {
  userId: string;
  email: string;
}

export class PasswordChangedEvent extends BaseApplicationEvent<PasswordChangedPayload> {
  constructor(params: {
    payload: PasswordChangedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({
      eventName: EventNames.PASSWORD_CHANGED,
      ...params,
    });
  }
}

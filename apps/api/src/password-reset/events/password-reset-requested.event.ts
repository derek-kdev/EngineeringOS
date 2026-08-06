import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
import { EventNames } from '../../events/constants/event-names.constants';

interface PasswordResetRequestedPayload {
  userId: string;
  email: string;
}

export class PasswordResetRequestedEvent extends BaseApplicationEvent<PasswordResetRequestedPayload> {
  constructor(params: {
    payload: PasswordResetRequestedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({
      eventName: EventNames.PASSWORD_RESET_REQUESTED,
      ...params,
    });
  }
}

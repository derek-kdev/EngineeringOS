import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
import { EventNames } from '../../events/constants/event-names.constants';

interface OrganizationDeletedPayload {
  organizationId: string;
  name: string;
  slug?: string;
}

export class OrganizationDeletedEvent extends BaseApplicationEvent<OrganizationDeletedPayload> {
  constructor(params: {
    payload: OrganizationDeletedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({
      ...params,
      eventName: EventNames.ORGANIZATION_DELETED,
    });
  }
}

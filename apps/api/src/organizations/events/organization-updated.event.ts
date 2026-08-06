import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
import { EventNames } from '../../events/constants/event-names.constants';

interface OrganizationUpdatedPayload {
  organizationId: string;
  updatedFields: string[];
  name: string;
  slug: string;
}

export class OrganizationUpdatedEvent extends BaseApplicationEvent<OrganizationUpdatedPayload> {
  constructor(params: {
    payload: OrganizationUpdatedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({
      eventName: EventNames.ORGANIZATION_UPDATED,
      ...params,
    });
  }
}

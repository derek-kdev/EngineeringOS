import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';

interface OrganizationUpdatedPayload {
  organizationId: string;
  updatedFields: string[];
  name: string;
  slug: string;
}

export class OrganizationUpdatedEvent extends BaseApplicationEvent<OrganizationUpdatedPayload> {
  static readonly eventName = 'organization.updated';

  constructor(params: {
    payload: OrganizationUpdatedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: OrganizationUpdatedEvent.eventName });
  }
}

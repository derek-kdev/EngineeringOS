import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';

interface OrganizationDeletedPayload {
  organizationId: string;
  name: string;
  slug?: string;
}

export class OrganizationDeletedEvent extends BaseApplicationEvent<OrganizationDeletedPayload> {
  static readonly eventName = 'organization.deleted';

  constructor(params: {
    payload: OrganizationDeletedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: OrganizationDeletedEvent.eventName });
  }
}

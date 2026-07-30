import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';

interface OrganizationCreatedPayload {
  organizationId: string;
  name: string;
  slug: string;
  ownerId: string;
}

export class OrganizationCreatedEvent extends BaseApplicationEvent<OrganizationCreatedPayload> {
  static readonly eventName = 'organization.created';

  constructor(params: {
    payload: OrganizationCreatedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({ ...params, eventName: OrganizationCreatedEvent.eventName });
  }
}

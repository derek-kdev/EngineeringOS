import { BaseApplicationEvent } from '../../events/base/application-event.base';
import { EventMetadata } from '../../events/interfaces/event-metadata.interface';
import { EventNames } from '@/events/constants/event-names.constants';

interface OrganizationCreatedPayload {
  organizationId: string;
  name: string;
  slug: string;
  ownerId: string;
}

export class OrganizationCreatedEvent extends BaseApplicationEvent<OrganizationCreatedPayload> {
  constructor(params: {
    payload: OrganizationCreatedPayload;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    super({
      eventName: EventNames.ORGANIZATION_CREATED,
      ...params,
    });
  }
}

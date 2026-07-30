import { EventMetadata } from './event-metadata.interface';

export interface ApplicationEvent<TPayload = any> {
  readonly id: string;
  readonly eventName: string;
  readonly occurredAt: Date;
  readonly organizationId?: string;
  readonly userId?: string;
  readonly payload: TPayload;
  readonly metadata: EventMetadata;
}

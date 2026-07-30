import { randomUUID } from 'crypto';
import { ApplicationEvent } from '../interfaces/application-event.interface';
import { EventMetadata } from '../interfaces/event-metadata.interface';

export abstract class BaseApplicationEvent<
  TPayload = any,
> implements ApplicationEvent<TPayload> {
  public readonly id: string;
  public readonly eventName: string;
  public readonly occurredAt: Date;
  public readonly organizationId?: string;
  public readonly userId?: string;
  public readonly payload: TPayload;
  public readonly metadata: EventMetadata;

  constructor(params: {
    payload: TPayload;
    eventName?: string;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    this.id = params.id || randomUUID();
    this.eventName = params.eventName || this.constructor.name;
    this.occurredAt = params.occurredAt || new Date();
    this.organizationId = params.organizationId;
    this.userId = params.userId;
    this.payload = params.payload;
    this.metadata = {
      requestId: params.metadata?.requestId,
      correlationId: params.metadata?.correlationId,
      causationId: params.metadata?.causationId,
      source: params.metadata?.source || 'engineeringos',
    };
  }
}

import { randomUUID } from 'crypto';
import { ApplicationEvent } from '../interfaces/application-event.interface';
import { EventMetadata } from '../interfaces/event-metadata.interface';
import { EventName } from '../constants/event-names.constants';

export abstract class BaseApplicationEvent<
  TPayload = any,
> implements ApplicationEvent<TPayload> {
  public readonly id: string;
  public readonly eventName: EventName;
  public readonly occurredAt: Date;
  public readonly organizationId?: string;
  public readonly userId?: string;
  public readonly payload: TPayload;
  public readonly metadata: EventMetadata;

  constructor(params: {
    payload: TPayload;
    eventName: EventName;
    id?: string;
    occurredAt?: Date;
    organizationId?: string;
    userId?: string;
    metadata?: Partial<EventMetadata>;
  }) {
    this.id = params.id || randomUUID();
    this.eventName = params.eventName;
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

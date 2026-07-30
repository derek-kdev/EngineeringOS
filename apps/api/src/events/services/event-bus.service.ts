import { Injectable, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEventPublisher } from '../interfaces/event-publisher.interface';
import { ApplicationEvent } from '../interfaces/application-event.interface';
import { AppLogger } from '../../observability/logging/interfaces/app-logger.interface';
import { AppLoggerToken } from '../../observability/logging/services/logger.factory';
import { RequestContextService } from '../../observability/logging/services/request-context.service';

@Injectable()
export class EventBusService implements IEventPublisher {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(AppLoggerToken) private readonly logger: AppLogger,
    private readonly contextService: RequestContextService,
  ) {}

  async publish<T extends ApplicationEvent<unknown>>(event: T): Promise<void> {
    // Enrich event with request context
    const enrichedEvent = this.enrichWithContext(event);

    this.logger.debug('Publishing event', {
      eventName: enrichedEvent.eventName,
      eventId: enrichedEvent.id,
      organizationId: enrichedEvent.organizationId,
      userId: enrichedEvent.userId,
    });

    this.eventEmitter.emit(enrichedEvent.eventName, enrichedEvent);
  }

  publishSync<T extends ApplicationEvent<unknown>>(event: T): void {
    const enrichedEvent = this.enrichWithContext(event);
    this.logger.debug('Publishing event (sync)', {
      eventName: enrichedEvent.eventName,
      eventId: enrichedEvent.id,
    });
    this.eventEmitter.emit(enrichedEvent.eventName, enrichedEvent);
  }

  async publishMany<T extends ApplicationEvent<unknown>>(
    events: readonly T[],
  ): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }

  private enrichWithContext<T extends ApplicationEvent<unknown>>(event: T): T {
    const context = this.contextService.getContext();
    if (!context) {
      return event;
    }
    // Build merged metadata
    const mergedMetadata = {
      ...event.metadata,
      ...(context.requestId && !event.metadata.requestId
        ? { requestId: context.requestId }
        : {}),
      ...(context.correlationId && !event.metadata.correlationId
        ? { correlationId: context.correlationId }
        : {}),
      ...(context.ipAddress && !event.metadata.ipAddress
        ? { ipAddress: context.ipAddress }
        : {}),
      ...(context.userAgent && !event.metadata.userAgent
        ? { userAgent: context.userAgent }
        : {}),
    };

    // Create a new event-like object with enriched values
    const enriched = {
      ...event,
      metadata: mergedMetadata,
      userId: event.userId ?? context.userId,
      organizationId: event.organizationId ?? context.organizationId,
    } as T;

    return enriched;
  }
}

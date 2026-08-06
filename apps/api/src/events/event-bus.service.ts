import { Injectable, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEventPublisher } from './interfaces/event-publisher.interface';
import { ApplicationEvent } from './interfaces/application-event.interface';
import { AppLogger } from '../observability/logging/interfaces/app-logger.interface';
import { AppLoggerToken } from '../observability/logging/services/logger.factory';
import { RequestContextService } from '../observability/logging/request-context.service';

@Injectable()
export class EventBusService implements IEventPublisher {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(AppLoggerToken) private readonly logger: AppLogger,
    private readonly contextService: RequestContextService,
  ) {}

  async publish<T extends ApplicationEvent<unknown>>(event: T): Promise<void> {
    const enrichedEvent = this.enrichWithContext(event);
    this.logger.debug('Publishing event', {
      eventName: enrichedEvent.eventName,
      eventId: enrichedEvent.id,
      organizationId: enrichedEvent.organizationId,
      userId: enrichedEvent.userId,
    });

    await this.emitSafely(enrichedEvent);
  }

  publishSync<T extends ApplicationEvent<unknown>>(event: T): void {
    const enrichedEvent = this.enrichWithContext(event);
    this.logger.debug('Publishing event (sync)', {
      eventName: enrichedEvent.eventName,
      eventId: enrichedEvent.id,
    });
    this.emitSafelySync(enrichedEvent);
  }

  async publishMany<T extends ApplicationEvent<unknown>>(
    events: readonly T[],
  ): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }

  private async emitSafely<T extends ApplicationEvent<unknown>>(
    event: T,
  ): Promise<void> {
    // eslint-disable-next-line prettier/prettier
    const listeners = this.eventEmitter.listeners(event.eventName) as unknown as Array<
      (event: T) => void | Promise<void>
    >;

    for (const listener of listeners) {
      try {
        await listener(event);
      } catch (error) {
        this.logger.error(
          `Handler failed for event "${event.eventName}" (id: ${event.id})`,
          {
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            eventId: event.id,
            eventName: event.eventName,
          },
        );
      }
    }
  }

  private emitSafelySync<T extends ApplicationEvent<unknown>>(event: T): void {
    const listeners = this.eventEmitter.listeners(
      event.eventName,
    ) as unknown as Array<(event: T) => void | Promise<void>>;

    for (const listener of listeners) {
      try {
        const result = listener(event);
        if (result instanceof Promise) {
          result.catch((error) => {
            this.logger.error(
              `Async handler failed for event "${event.eventName}" (id: ${event.id})`,
              {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
                eventId: event.id,
                eventName: event.eventName,
              },
            );
          });
        }
      } catch (error) {
        this.logger.error(
          `Handler failed for event "${event.eventName}" (id: ${event.id})`,
          {
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            eventId: event.id,
            eventName: event.eventName,
          },
        );
      }
    }
  }

  private enrichWithContext<T extends ApplicationEvent<unknown>>(event: T): T {
    const context = this.contextService.getContext();
    if (!context) {
      return event;
    }
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

    return {
      ...event,
      metadata: mergedMetadata,
      userId: event.userId ?? context.userId,
      organizationId: event.organizationId ?? context.organizationId,
    };
  }
}

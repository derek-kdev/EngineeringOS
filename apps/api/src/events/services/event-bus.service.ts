import { Injectable, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEventPublisher } from '../interfaces/event-publisher.interface';
import { ApplicationEvent } from '../interfaces/application-event.interface';
import { AppLogger } from '../../observability/logging/interfaces/app-logger.interface';
import { AppLoggerToken } from '../../observability/logging/services/logger.factory';

@Injectable()
export class EventBusService implements IEventPublisher {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(AppLoggerToken) private readonly logger: AppLogger,
  ) {}

  async publish<T extends ApplicationEvent<unknown>>(event: T): Promise<void> {
    this.logger.debug('Publishing event', {
      eventName: event.eventName,
      eventId: event.id,
      organizationId: event.organizationId,
      userId: event.userId,
    });

    // EventEmitter2 emits synchronously by default, but listeners may be async.
    // We don't await the emit because we want the handlers to run independently.
    this.eventEmitter.emit(event.eventName, event);
  }

  // Optional sync variant (if needed)
  publishSync<T extends ApplicationEvent<unknown>>(event: T): void {
    this.logger.debug('Publishing event (sync)', {
      eventName: event.eventName,
      eventId: event.id,
    });
    this.eventEmitter.emit(event.eventName, event);
  }

  // Optional bulk publish
  async publishMany<T extends ApplicationEvent<unknown>>(events: readonly T[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }
}

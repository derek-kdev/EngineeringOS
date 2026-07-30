import { ApplicationEvent } from './application-event.interface';

export interface IEventPublisher {
  publish<T extends ApplicationEvent<unknown>>(event: T): Promise<void>;
  publishSync?<T extends ApplicationEvent<unknown>>(event: T): void;
  publishMany?<T extends ApplicationEvent<unknown>>(
    events: readonly T[],
  ): Promise<void>;
}

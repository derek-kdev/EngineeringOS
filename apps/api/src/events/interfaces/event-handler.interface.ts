import { ApplicationEvent } from './application-event.interface';

export interface IEventHandler<T extends ApplicationEvent<unknown>> {
  handle(event: T): Promise<void>;
}

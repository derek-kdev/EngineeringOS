import { ApplicationEvent } from './application-event.interface';

export interface IEventHandler<T extends ApplicationEvent<unknown> = any> {
  handle(event: T): Promise<void> | void;
}

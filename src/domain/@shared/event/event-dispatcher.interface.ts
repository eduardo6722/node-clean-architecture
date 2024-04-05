import { IEventHandler } from './event-handler.interface';
import { IEventInterface } from './event.interface';

export interface IEventDispatcher {
  notify(event: IEventInterface): void;
  register(eventName: string, eventHandler: IEventHandler): void;
  unregister(eventName: string, eventHandler: IEventHandler): void;
  unregisterAll(): void;
}

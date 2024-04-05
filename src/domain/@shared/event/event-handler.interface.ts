import { IEventInterface } from './event.interface';

export interface IEventHandler<T extends IEventInterface = IEventInterface> {
  handle(event: T): void;
}

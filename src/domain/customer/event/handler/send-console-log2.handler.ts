import { IEventHandler } from '../../../@shared/event/event-handler.interface';
import { CustomerCreatedEvent } from '../customer-created.event';

export class SendConsoleLog2Handler
  implements IEventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent) {
    console.log(
      'Esse é o segundo console.log do evento: CustomerCreated',
      event.eventData,
    );
  }
}

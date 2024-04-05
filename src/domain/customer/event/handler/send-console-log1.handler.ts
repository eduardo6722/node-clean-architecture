import { IEventHandler } from '../../../@shared/event/event-handler.interface';
import { CustomerCreatedEvent } from '../customer-created.event';

export class SendConsoleLog1Handler
  implements IEventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent) {
    console.log(
      'Esse é o primeiro console.log do evento: CustomerCreated',
      event.eventData,
    );
  }
}

import { IEventHandler } from '../../../@shared/event/event-handler.interface';
import { CustomerAddressChangedEvent } from '../customer-address-changed.event';

export class SendConsoleLogHandler
  implements IEventHandler<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent) {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`,
    );
  }
}

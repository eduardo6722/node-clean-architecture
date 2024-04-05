import { IEventInterface } from '../../@shared/event/event.interface';

export class ProductCreatedEvent implements IEventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.eventData = eventData;
    this.dataTimeOccurred = new Date();
  }
}

import { Entity } from '../../@shared/entity/entity.abstract';
import { EventDispatcher } from '../../@shared/event/event-dispatcher';
import { NotificationError } from '../../@shared/notification/notification.error';
import { CustomerAddressChangedEvent } from '../event/customer-address-changed.event';
import { SendConsoleLogHandler } from '../event/handler/send-console-log.handler';
import { CustomerValidaorFactory } from '../factory/customer-validator.factory';
import { Address } from '../value-object/address';

export class Customer extends Entity {
  _name: string;
  _address!: Address;
  _active: boolean = false;
  _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    CustomerValidaorFactory.create().validate(this);
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  activate() {
    if (!this._address) {
      this.notification.addError({
        context: 'customer',
        message: 'address is required',
      });
      this.validate();
      return;
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  isActive() {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  changeAddress(address: Address) {
    this._address = address;
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler();
    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);
    const addressChangedEvent = new CustomerAddressChangedEvent({
      id: this.id,
      name: this._name,
      address,
    });
    eventDispatcher.notify(addressChangedEvent);
  }

  set Address(address: Address) {
    this._address = address;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }

  get name() {
    return this._name;
  }

  get address() {
    return this._address;
  }
}

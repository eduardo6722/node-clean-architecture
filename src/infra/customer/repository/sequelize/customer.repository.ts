import { Address } from '../../../../domain/customer/value-object/address';
import { Customer } from '../../../../domain/customer/entity/customer';
import { CustomerCreatedEvent } from '../../../../domain/customer/event/customer-created.event';
import { SendConsoleLog1Handler } from '../../../../domain/customer/event/handler/send-console-log1.handler';
import { SendConsoleLog2Handler } from '../../../../domain/customer/event/handler/send-console-log2.handler';
import { ICustomerRepository } from '../../../../domain/customer/repository/customer-repository.interface';
import { CustomerModel } from './customer.model';
import { EventDispatcher } from '../../../../domain/@shared/event/event-dispatcher';

export class CustomerRepository implements ICustomerRepository {
  async create(entity: Customer): Promise<void> {
    try {
      await CustomerModel.create({
        id: entity.id,
        name: entity.name,
        street: entity.address._street,
        number: entity.address._number,
        zip: entity.address._zip,
        city: entity.address._city,
      });
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLog1Handler();
      const eventHandler2 = new SendConsoleLog2Handler();
      eventDispatcher.register('CustomerCreatedEvent', eventHandler);
      eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
      const customerCreatedEvent = new CustomerCreatedEvent(entity);
      eventDispatcher.notify(customerCreatedEvent);
    } catch (error) {
      throw new Error('Failed do create customer' + error);
    }
  }

  async find(id: string): Promise<Customer | null> {
    try {
      const customerModel = await CustomerModel.findOne({ where: { id } });
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city,
      );
      const customer = new Customer(customerModel.id, customerModel.name);
      customer.Address = address;
      if (customerModel.active) {
        customer.activate();
      }
      return customer;
    } catch {
      return null;
    }
  }

  async findAll(): Promise<Customer[]> {
    try {
      const data = await CustomerModel.findAll();
      return data.map((customerModel) => {
        const address = new Address(
          customerModel.street,
          customerModel.number,
          customerModel.zip,
          customerModel.city,
        );
        const customer = new Customer(customerModel.id, customerModel.name);
        customer.Address = address;
        return customer;
      });
    } catch (error) {
      throw new Error('Failed to find all customers' + error);
    }
  }

  async update(entity: Customer): Promise<void> {
    try {
      await CustomerModel.update(
        {
          name: entity.name,
          street: entity.address._street,
          number: entity.address._number,
          zip: entity.address._zip,
          city: entity.address._city,
        },
        {
          where: { id: entity.id },
        },
      );
    } catch (error) {
      throw new Error('Failed to update customer' + error);
    }
  }

  async activate(id: string): Promise<void> {
    try {
      await CustomerModel.update(
        {
          active: true,
        },
        { where: { id } },
      );
    } catch (error) {
      throw new Error('Failed to activate customer' + error);
    }
  }

  async deactivate(id: string): Promise<void> {
    try {
      await CustomerModel.update(
        {
          active: false,
        },
        { where: { id } },
      );
    } catch (error) {
      throw new Error('Failed to deactivate customer' + error);
    }
  }
}

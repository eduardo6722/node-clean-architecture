type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    zip: string;
    city: string;
  };
};

export interface IFindAllCustomersInputDto {}

export interface IFindAllCustomersOutputDto {
  customers: Customer[];
}

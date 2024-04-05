export interface ICreateCustomerInputDto {
  name: string;
  address: {
    street: string;
    number: string;
    zip: string;
    city: string;
  };
}

export interface ICreateCustomerOutputDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    zip: string;
    city: string;
  };
}

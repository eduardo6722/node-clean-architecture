export interface IUpdateCustomerInputDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    zip: string;
    city: string;
  };
}

export interface IUpdateCustomerOutDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    zip: string;
    city: string;
  };
}

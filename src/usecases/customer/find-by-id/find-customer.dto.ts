export interface IFindCustomerInputDto {
  id: string;
}

export interface IFindCustomerOutputDto {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: string;
    zip: string;
  };
}

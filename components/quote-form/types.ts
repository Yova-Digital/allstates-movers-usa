export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
}

export interface FormData {
  fromZip: string
  toZip: string
  fromAddress: Address
  toAddress: Address
  movingDate: string
  deliveryDate: string
  moveSize: string
  fullName: string
  email: string
  phone: string
}

export type UpdateFormDataFn = (field: string, value: any) => void;

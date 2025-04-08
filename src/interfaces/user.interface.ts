import DefaultEntityType from "./default";

export default interface User extends DefaultEntityType {
  cpf: string,
  name: string,
  phone:  string,
  email: string,
  birthDate: string,
  role: 'admin' | 'customer' | 'operator',
  password: string,
  active: boolean,
  storeId: number | null

}
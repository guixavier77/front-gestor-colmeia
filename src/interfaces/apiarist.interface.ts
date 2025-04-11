import DefaultEntityType from "./default";

export default interface Apiarist extends DefaultEntityType {
  cpf: string,
  name: string,
  phone: string;
  latitude: string,
  longitude: string
  email: string
  active: boolean
  password: string
}
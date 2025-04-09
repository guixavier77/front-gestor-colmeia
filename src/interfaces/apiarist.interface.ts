import DefaultEntityType from "./default";

export default interface Apiarist extends DefaultEntityType {
  cpf: string,
  name: string,
  phone: string;
}
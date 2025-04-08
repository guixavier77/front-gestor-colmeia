import DefaultEntityType from "./default";

export default interface Award extends DefaultEntityType {
  name: string,
  active: boolean,
  price: number,
  image: string,


}
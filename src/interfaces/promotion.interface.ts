import DefaultEntityType from "./default";

export default interface Promotion extends DefaultEntityType {
  name: string,
  active: boolean,
  points: number,
  awardId: number
  maxWinners: number
}
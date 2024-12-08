export default class Cargo {
  public name: string;
  public weight: number;
  public value: number;
  public amount: number;

  constructor(name: string, weight: number, value: number, amount: number) {
    this.name = name;
    this.weight = weight;
    this.value = value;
    this.amount = amount;
  }
}
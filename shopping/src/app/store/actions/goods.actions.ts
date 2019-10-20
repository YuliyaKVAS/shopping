import {Good} from "../../models/good.model";

export class GetGoods {
  static readonly type = '[Goods] Get Goods';
}

export class AddToCard {
  static readonly type = '[Goods] Add To Card';

  constructor(public payload: Good) {}
}

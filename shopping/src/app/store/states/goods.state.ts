import {Good} from "../../models/good.model";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {AddToCard, GetGoods} from "../actions/goods.actions";
import {GoodsService} from "../../services/goods.service";
import {tap} from "rxjs/operators";

export interface GoodsStateModel {
  goods: Good[];
  selected: Good[];
}

@State<GoodsStateModel>({
  name: 'goods',
  defaults: {
    goods: [],
    selected: []
  }
})
export class GoodsState {

  constructor(private goodsService: GoodsService) {}

   @Selector()
  static getGoodsList(state: GoodsStateModel): Good[] {
     return state.goods
   }

   @Action(GetGoods)
  getGoods({ getState, setState }: StateContext<GoodsStateModel>) {
     return this.goodsService.getGoods().pipe(tap(result => {
       const state = getState();
       setState({
         ...state,
         goods: result
       });
     }));
   }

   @Action(AddToCard)
  addToCard({ getState, patchState }: StateContext<GoodsStateModel>, { payload }: AddToCard){
    return this.goodsService.addToCard(payload.id).pipe(tap(result => {
      const state = getState();
      patchState({
        selected: [...state.selected, result]
      });
    }));
   }
}

import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {GoodsState} from "../../store/states/goods.state";
import {Observable} from "rxjs";
import {Good} from "../../models/good.model";
import {GetGoods} from "../../store/actions/goods.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(GoodsState.getGoodsList) goods: Observable<Good[]>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetGoods());
  }

}

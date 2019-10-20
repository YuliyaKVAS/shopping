import {Component, Input, OnInit} from '@angular/core';
import {Good} from "../../models/good.model";
import {Store} from "@ngxs/store";
import {AddToCard} from "../../store/actions/goods.actions";

@Component({
  selector: 'app-good-item',
  templateUrl: './good-item.component.html',
  styleUrls: ['./good-item.component.scss']
})
export class GoodItemComponent implements OnInit {
  @Input() good: Good;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  addToCard(good: Good) {
    this.store.dispatch(new AddToCard(good));
  }

}

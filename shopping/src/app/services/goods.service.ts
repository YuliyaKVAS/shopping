import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Good} from "../models/good.model";

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(private http: HttpClient) { }

  getGoods(): Observable<Good[]> {
    return this.http.get<Good[]>(`${BASE_URL}goods`);
  }

  addToCard(id: string): Observable<Good> {
    return this.http.get<Good>(`${BASE_URL}goods/${id}`);
  }
}

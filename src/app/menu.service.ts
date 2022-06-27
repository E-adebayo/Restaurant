import { Restaurant } from './class/restaurant';
import { Menu } from './class/menu';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menu!: Menu
  list_length!: number
  restaurant!: Restaurant
  constructor(private http: HttpClient) { }

  getDataLength() {
    this.http.get<Menu[]>('http://localhost:3000/menu').subscribe(data => {
      this.list_length = (data).length
    })
  }
  getDatabyRestaurant(restaurant: Restaurant): Observable<Menu[]> {
    return this.http.get<Menu[]>('http://localhost:3000/menu?restaurant_id=' + restaurant.id)
  }
  
  getMenuByIndex(menu_idx: number): Menu {
    this.http.get<Menu>('http://localhost:3000/menu/' + menu_idx)
      .subscribe(data => {
        this.menu = data
      })
    return this.menu
  }

  updateLikes(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>('http://localhost:3000/menu/' + menu.id, menu)
  }

  addMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>('http://localhost:3000/menu', menu)
  }

}


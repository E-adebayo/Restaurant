import { Categorie } from './class/categorie';
import { Restaurant } from './class/restaurant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestaurantserviceService {
  restaurant!: Restaurant
  list_length!: number
  constructor(private http: HttpClient) {

  }
  getDataLength() {
    this.http.get<Restaurant[]>('http://localhost:3000/restaurant').subscribe(data => {
      this.list_length = data.length
    })
  }
  updateLikes(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>('http://localhost:3000/restaurant/' + restaurant.id, restaurant)
  }
  getResByIndex(res_idx: number): Observable<Restaurant> {
    return this.http.get<Restaurant>('http://localhost:3000/restaurant/' + res_idx)
  }
  getRestaurantid(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.get<Restaurant>('http://localhost:3000/restaurant?id=')
  }
  
  getData(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('http://localhost:3000/restaurant')
  }

  getDatabyCategorie(categorie: Categorie): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('http://localhost:3000/restaurant?categorie=' + categorie.id)
  }
  
  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>('http://localhost:3000/restaurant', restaurant)
  }

}

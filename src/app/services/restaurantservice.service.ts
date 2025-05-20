import { Categorie } from '../class/categorie';
import { Restaurant } from '../class/restaurant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantserviceService {
  restaurant!: Restaurant
  list_length!: number
  private categoriesCache: Categorie[] = [];

  constructor(private http: HttpClient) {
    // Preload categories for better performance
    this.loadCategories();
  }

  private loadCategories(): void {
    this.http.get<Categorie[]>('http://localhost:3000/categorie')
      .subscribe(categories => {
        this.categoriesCache = categories;
      });
  }

  getDataLength() {
    this.http.get<Restaurant[]>('http://localhost:3000/restaurant').subscribe(data => {
      this.list_length = data.length
    });
  }

  updateLikes(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>('http://localhost:3000/restaurant/' + restaurant.id, restaurant);
  }

  getResByIndex(res_idx: number): Observable<Restaurant> {
    return this.http.get<Restaurant>('http://localhost:3000/restaurant/' + res_idx);
  }

  getRestaurantid(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.get<Restaurant>('http://localhost:3000/restaurant?id=');
  }
  
  getData(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('http://localhost:3000/restaurant');
  }

  // Get restaurant data with category names
  getRestaurantsWithCategoryNames(): Observable<(Restaurant & {categoryName: string})[]> {
    return this.getData().pipe(
      map(restaurants => {
        return restaurants.map(restaurant => {
          const categoryName = this.getCategoryNameById(restaurant.categorie);
          return {...restaurant, categoryName};
        });
      })
    );
  }

  // Get a single restaurant with category name
  getRestaurantWithCategoryName(id: number): Observable<Restaurant & {categoryName: string}> {
    return this.getResByIndex(id).pipe(
      map(restaurant => {
        const categoryName = this.getCategoryNameById(restaurant.categorie);
        return {...restaurant, categoryName};
      })
    );
  }

  // Get category name by ID
  getCategoryNameById(categoryId: number): string {
    const category = this.categoriesCache.find(c => c.id === categoryId);
    return category ? category.name.toString() : 'Unknown Category';
  }

  getDatabyCategorie(categorie: Categorie): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('http://localhost:3000/restaurant?categorie=' + categorie.id);
  }
  
  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>('http://localhost:3000/restaurant', restaurant);
  }
}

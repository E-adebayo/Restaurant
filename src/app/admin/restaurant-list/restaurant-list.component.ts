import { CategorieserviceService } from './../../services/categorieservice.service';
import { RestaurantserviceService } from './../../services/restaurantservice.service';
import { Categorie } from './../../class/categorie';
import { Restaurant } from './../../class/restaurant';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  RestaurantArray: (Restaurant & {categoryName?: string})[] = [];
  categorie: Categorie[] = [];
  currentCategory: Categorie | null = null;
  isLoggedIn$: Observable<boolean>;
  
  constructor(
    private service: RestaurantserviceService, 
    private catServ: CategorieserviceService,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    
    // Get restaurants with category names instead of just IDs
    this.service.getRestaurantsWithCategoryNames().subscribe(data => {
      this.RestaurantArray = data.sort((r1, r2) => r2.likes - r1.likes);
    });

    this.catServ.getData().subscribe(data => {
      this.categorie = data;
    });
  }

  ngOnInit(): void {
  }

  FilterbyCat(categorie: Categorie) {
    this.currentCategory = categorie;
    
    if (categorie.id != 0) {
      this.service.getDatabyCategorie(categorie).subscribe(data => {
        this.RestaurantArray = data.map(restaurant => {
          const categoryName = this.service.getCategoryNameById(restaurant.categorie);
          return {...restaurant, categoryName};
        });
      });
    }
    else {
      this.currentCategory = null;
      this.service.getRestaurantsWithCategoryNames().subscribe(data => {
        this.RestaurantArray = data;
      });
    }
  }
}

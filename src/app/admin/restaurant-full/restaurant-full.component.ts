import { RestaurantserviceService } from './../../services/restaurantservice.service';
import { MenuService } from './../../services/menu.service';
import { Restaurant } from './../../class/restaurant';
import { Menu } from './../../class/menu';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-restaurant-full',
  templateUrl: './restaurant-full.component.html',
  styleUrls: ['./restaurant-full.component.css']
})
export class RestaurantFullComponent implements OnInit {
  res_idx!: number
  restaurant !: Restaurant & { categoryName?: string }
  menus !: Menu[]
  categoryName: string = '';
  isLoggedIn$: Observable<boolean>;

  constructor(
    private activatedroute: ActivatedRoute, 
    private restaurantService: RestaurantserviceService, 
    private menuService: MenuService,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.res_idx = parseInt(this.activatedroute.snapshot.paramMap.get('id') || '0')
    
    this.restaurantService.getRestaurantWithCategoryName(this.res_idx)
      .subscribe(data => {
         this.restaurant = data;
         this.categoryName = data.categoryName || '';
         
         this.menuService.getDatabyRestaurant(this.restaurant)
           .subscribe(result => {
             this.menus = result;
           });
      });
  }

  ngOnInit(): void {
  }

  getId(): number {
    return this.res_idx;
  }
}

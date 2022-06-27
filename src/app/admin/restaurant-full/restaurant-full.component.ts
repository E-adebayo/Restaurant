import { RestaurantserviceService } from './../../restaurantservice.service';
import { MenuService } from './../../menu.service';
import { Restaurant } from './../../class/restaurant';
import { Menu } from './../../class/menu';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-full',
  templateUrl: './restaurant-full.component.html',
  styleUrls: ['./restaurant-full.component.css']
})
export class RestaurantFullComponent implements OnInit {
  res_idx!: number
  restaurant !: Restaurant
  menus !: Menu[]

  constructor(private activatedroute: ActivatedRoute, restaurantService: RestaurantserviceService, menuService: MenuService) {
    this.res_idx = parseInt(this.activatedroute.snapshot.paramMap.get('id') || '0')
    restaurantService.getResByIndex(this.res_idx)
      .subscribe(data =>{
         this.restaurant = data
         menuService.getDatabyRestaurant(this.restaurant)
         .subscribe(result =>{
          this.menus = result
         })
        })
        
    console.log('id :',this.res_idx);
  }
  ngOnInit(): void {
  }

  getId() : number{
    return this.res_idx;
  }

}

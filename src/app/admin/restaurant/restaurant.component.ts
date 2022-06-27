import { AdminRoutingModule } from './../admin-routing.module';
import { RestaurantserviceService } from './../../restaurantservice.service';
import { Restaurant } from './../../class/restaurant';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant!: Restaurant
  @Input() res_idx!: number
  constructor(private service: RestaurantserviceService, private routeur: Router) { }

  ngOnInit(): void {
  }

  increment(event: Event) {
    event.stopPropagation()
    this.restaurant.likes += 1 // -=1
    this.service.updateLikes(this.restaurant)
      .subscribe(data => {
        this.restaurant.likes = data.likes
      })
  }


  decrement(event: Event) {
    event.stopPropagation()
    if (this.restaurant.likes > 0)
      this.restaurant.likes -= 1 // -=1
    this.service.updateLikes(this.restaurant)
      .subscribe(data => {
        this.restaurant.likes = data.likes
      })
  }

  readMore() {
    this.routeur.navigate(['/', 'restaurant', this.res_idx])
  }
}

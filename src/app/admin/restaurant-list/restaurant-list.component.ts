import { CategorieserviceService } from './../../categorieservice.service';
import { RestaurantserviceService } from './../../restaurantservice.service';
import { Categorie } from './../../class/categorie';
import { Restaurant } from './../../class/restaurant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  RestaurantArray: Restaurant[] = []
  categorie: Categorie[] = []
  constructor(private service: RestaurantserviceService, private catServ: CategorieserviceService) {

    this.service.getData().subscribe(data => {
      this.RestaurantArray = data.sort((r1, r2) => r2.likes - r1.likes)
    })

    this.catServ.getData().subscribe(data => {
      this.categorie = data
    })
  }

  ngOnInit(): void {
  }

  FilterbyCat(categorie: Categorie) {
    if (categorie.id != 0)
      this.service.getDatabyCategorie(categorie).subscribe(data => {
        this.RestaurantArray = data
      })
    else
      this.service.getData().subscribe(data => {
        this.RestaurantArray = data
      })

  }


}

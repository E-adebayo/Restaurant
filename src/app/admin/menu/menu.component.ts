import { MenuService } from './../../menu.service';
import { Menu } from './../../class/menu';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() menu!: Menu
  @Input() menu_idx!: number
  @Input() commentaire!: string
  constructor(private routeur: Router, private service: MenuService) { }

  ngOnInit(): void {
  }

  increment(event: Event) {
    this.menu.likes += 1 // -=1
    this.service.updateLikes(this.menu)
      .subscribe(data => {
        this.menu.likes = data.likes
      })
  }


  decrement(event: Event) {
    if (this.menu.likes > 0)
      this.menu.likes -= 1 // -=1
    this.service.updateLikes(this.menu)
      .subscribe(data => {
        this.menu.likes = data.likes
      })
  }
}

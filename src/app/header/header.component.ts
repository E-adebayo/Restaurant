import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  id!: number
  @Input() public isLoggedIn: boolean

  constructor(private activatedroute: ActivatedRoute, private router: Router) {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "yes";
  }

  ngOnInit(): void {
    window.addEventListener("storage", ()=>{
      console.log("logg firefed ")
      this.isLoggedIn = localStorage.getItem("isLoggedIn") === "yes"
    }) 
  }

  addmenu() {
    this.id = parseInt(this.activatedroute.snapshot.paramMap.get('id') || '0');
    this.router.navigate(['/', 'addmenu', this.id]);
    console.log('id',this.id);
  }

  logout() {
    localStorage.removeItem("isLoggedIn")
    this.router.navigate(['']);/* 
    window.location.reload(); */
  }

}

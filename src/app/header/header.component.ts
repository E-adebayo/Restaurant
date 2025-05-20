import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  id!: number
  isLoggedIn: boolean = false;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private activatedroute: ActivatedRoute, 
    private router: Router,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
    // Subscribe to the auth service to get real-time login state updates
    this.authService.isLoggedIn$.subscribe(
      loggedIn => {
        this.isLoggedIn = loggedIn;
        console.log('Login state changed:', loggedIn);
      }
    );
  }

  addmenu() {
    this.id = parseInt(this.activatedroute.snapshot.paramMap.get('id') || '0');
    this.router.navigate(['/', 'addmenu', this.id]);
    console.log('id',this.id);
  }

  logout() {
    this.authService.logout();
  }

}

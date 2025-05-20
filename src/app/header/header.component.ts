import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  id!: number;
  isLoggedIn: boolean = false;
  isLoggedIn$: Observable<boolean>;
  isMobileMenuOpen = false;

  constructor(
    private activatedroute: ActivatedRoute, 
    private router: Router,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    // Close mobile menu on route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMenu();
      });
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

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Prevent scrolling when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  }

  logout() {
    this.authService.logout();
    this.closeMenu();
  }

}

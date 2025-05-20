import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkInitialLoginState();
  }

  private checkInitialLoginState(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'yes';
    this.isLoggedInSubject.next(isLoggedIn);
  }

  private hasToken(): boolean {
    return localStorage.getItem('isLoggedIn') === 'yes';
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any>("http://localhost:3000/proprietaires")
      .pipe(
        tap(result => {
          const user = result.find((a: any) => {
            return (a.email === email) && (a.password === password);
          });
          
          if (user) {
            localStorage.setItem("isLoggedIn", "yes");
            this.isLoggedInSubject.next(true);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem("isLoggedIn");
    this.isLoggedInSubject.next(false);
    this.router.navigate(['']);
  }
}

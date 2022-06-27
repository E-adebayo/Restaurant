import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/proprietaires")
      .subscribe({
        next: (result) => {
          const user = result.find((a: any) => {
            return (a.email === this.loginForm.value.email) && (a.password === this.loginForm.value.password)
          });
          if (user) {
            localStorage.setItem("isLoggedIn", "yes")
            this.loginForm.reset();
            this.router.navigate(['addrestaurant']);/* 
            window.location.reload(); */
          } else {
            alert("Erreur d'ahuthentification");
          }
        }, error: () => {
          alert("Une erreur est survenue");
        }
      })
  }

}

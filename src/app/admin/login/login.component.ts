import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public isPasswordVisible = false;
  public isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login() {
    if (this.loginForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const { email, password } = this.loginForm.value;
    
    this.authService.login(email, password)
      .subscribe({
        next: (result) => {
          const user = result.find((a: any) => {
            return (a.email === email) && (a.password === password);
          });
          
          if (user) {
            this.loginForm.reset();
            this.router.navigate(['addrestaurant']);
          } else {
            alert("Identifiants incorrects");
          }
        }, 
        error: (error) => {
          console.error('Erreur de connexion:', error);
          alert("Une erreur est survenue lors de la connexion");
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (controlName === 'email') {
      if (control.errors['required']) {
        return 'L\'email est requis';
      }
      if (control.errors['email']) {
        return 'L\'email n\'est pas valide';
      }
    }

    if (controlName === 'password') {
      if (control.errors['required']) {
        return 'Le mot de passe est requis';
      }
      if (control.errors['minlength']) {
        return 'Le mot de passe doit contenir au moins 8 caractères';
      }
    }

    return '';
  }
}

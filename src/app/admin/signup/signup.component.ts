import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  public isPasswordVisible = false;
  public isConfirmPasswordVisible = false;
  public isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', Validators.required]
    }, {
      validator: this.checkPasswords('password', 'confirmpassword')
    });
  }

  togglePasswordVisibility(field: 'password' | 'confirmpassword'): void {
    if (field === 'password') {
      this.isPasswordVisible = !this.isPasswordVisible;
    } else {
      this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return `Le ${this.getFieldLabel(controlName)} est requis`;
    }

    switch (controlName) {
      case 'email':
        if (control.errors['email']) {
          return 'L\'email n\'est pas valide';
        }
        break;
      case 'password':
        if (control.errors['minlength']) {
          return 'Le mot de passe doit contenir au moins 8 caractères';
        }
        break;
      case 'confirmpassword':
        if (control.errors['checkPasswords']) {
          return 'Les mots de passe ne correspondent pas';
        }
        break;
      case 'telephone':
        if (control.errors['pattern']) {
          return 'Le numéro de téléphone doit contenir 10 chiffres';
        }
        break;
      case 'nom':
      case 'prenom':
        if (control.errors['minlength']) {
          return `Le ${this.getFieldLabel(controlName)} doit contenir au moins 2 caractères`;
        }
        break;
    }

    return '';
  }

  private getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      nom: 'nom',
      prenom: 'prénom',
      email: 'email',
      telephone: 'numéro de téléphone',
      password: 'mot de passe',
      confirmpassword: 'mot de passe de confirmation'
    };
    return labels[field] || field;
  }

  checkPasswords(pass: string, matchPass: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.get(pass);
      const confirmPassword = formGroup.get(matchPass);

      if (!password || !confirmPassword) {
        return null;
      }

      if (confirmPassword.errors && !confirmPassword.errors['checkPasswords']) {
        return null;
      }

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ checkPasswords: true });
      } else {
        confirmPassword.setErrors(null);
      }
      
      return null;
    };
  }

  signUp() {
    if (this.signupForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    
    this.http.post<any>("http://localhost:3000/proprietaires", this.signupForm.value)
      .subscribe({
        next: () => {
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.error('Erreur d\'inscription:', error);
          alert("Une erreur est survenue lors de l'inscription");
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}



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

  public signupForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', Validators.required]
    },
      {
        validator: this.checkPasswords('password', 'confirmpassword')
      }
    )
  }


  checkPasswords(pass: string, matchPass: string) {
    return (fG: FormGroup) => {
      const control = fG.controls[pass];
      const matchControl = fG.controls[matchPass];

      if (matchControl.errors && !matchControl.errors['checkPasswords']) {
        return
      }
      if (control.value !== matchControl.value) {
        matchControl.setErrors({ checkPasswords: true });
      }
      else {
        matchControl.setErrors(null);
      }
    }
  }


  signUp() {
    this.http.post<any>("http://localhost:3000/proprietaires", this.signupForm.value)
      .subscribe({
        complete: () => {
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error: () => {
          alert("une erreur est survenue");
        }
      })
  }


}



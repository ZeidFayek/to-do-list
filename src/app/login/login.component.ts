import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private _Router: Router) { }
  isLoading: boolean = false;
  LoginInCorrect: boolean = false;

  authDummy: any = {
    email: "zeyad@gamil.com",
    password: 123456
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    if (this.loginForm.valid) {
      this.isLoading = true;

      if (email == this.authDummy.email && password == this.authDummy.password) {
        this.isLoading = true;
        localStorage.setItem("userEmail", email);
        this._Router.navigate(['/to-do-list']);
      }
      else {
        this.LoginInCorrect = true;
      }
    }
  }
}

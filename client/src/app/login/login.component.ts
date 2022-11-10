import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formError = false;
  formErrorMessage = 'Please fill all the fields';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.formError = true;
      console.log('invalid');
      setTimeout(() => {
        this.formError = false;
      }, 3000);
      return;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

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
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getErrorMessageListener().subscribe((msg) => {
      this.formError = true;
      this.formErrorMessage = msg;
      console.log(msg);
      setTimeout(() => {
        this.formError = false;
        this.formErrorMessage = 'Please fill all the fields';
      }, 3000);
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.formError = true;
      console.log('invalid');
      setTimeout(() => {
        this.formError = false;
      }, 3000);
      return;
    }
    const user: User = {
      id: null,
      name: null,
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
      imageUrl: '',
    };

    this.auth.login(user);
  }
}

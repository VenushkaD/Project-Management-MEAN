import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  isLogin = true;

  loginForm: FormGroup = new FormGroup({});
  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'register') {
      this.isLogin = false;
    }

    if (this.route.snapshot.url[0].path === 'login') {
      this.isLogin = true;
    }

    this.initForm();

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

  initForm() {
    if (this.isLogin) {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      });
    } else {
      this.loginForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      });
    }
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
    if (this.isLogin) {
      const user: User = {
        _id: null,
        name: null,
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
        imageUrl: '',
        token: null,
      };

      this.auth.login(user);
    } else {
      const user: User = {
        _id: null,
        name: this.loginForm.value.name!,
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
        imageUrl: '',
        token: null,
      };

      this.auth.register(user);
    }
  }
}

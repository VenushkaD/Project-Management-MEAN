import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formError = false;
  formErrorMessage = 'Please fill all the fields';

  registerForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
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
    if (this.registerForm.invalid) {
      this.formError = true;
      console.log('invalid');
      setTimeout(() => {
        this.formError = false;
      }, 3000);
      return;
    }
    const user: User = {
      id: null,
      name: this.registerForm.value.name!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      imageUrl: '',
    };
    this.auth.register(user);
  }
}

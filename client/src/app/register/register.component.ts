import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formError = false;
  formErrorMessage = 'Please fill all the fields';

  registerForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.invalid) {
      this.formError = true;
      console.log('invalid');
      setTimeout(() => {
        this.formError = false;
      }, 3000);
      return;
    }
    console.log(this.registerForm.get('email')?.valid);
  }
}

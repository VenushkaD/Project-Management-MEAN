import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { AuthService } from '../auth.service';
import { Update } from '../store/auth.actions';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  imagePicked = '';
  imageFile: File | null = null;
  updateForm = new FormGroup({
    name: new FormControl(null, {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl(null, {
      validators: [Validators.required, Validators.email],
    }),
    image: new FormControl(null, {
      validators: [Validators.required],
    }),
  });
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      this.updateForm.setValue({
        name: authState.user.name,
        email: authState.user.email,
        image: null,
      });
      this.updateForm.get('image')?.updateValueAndValidity();
      this.imagePicked = authState.user.imageUrl;
    });
  }

  handleFileInput(event: any) {
    if (
      event.target.files[0]?.type !== 'image/png' &&
      event.target.files[0]?.type !== 'image/jpeg'
    ) {
      return;
    }

    if (event.target.files && event.target.files.length) {
      var fr = new FileReader();
      fr.onload = () => {
        this.imagePicked = fr.result as string;
        this.updateForm.get('image')?.updateValueAndValidity();
      };
      fr.readAsDataURL(event.target.files[0]);
      this.imageFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (
      this.updateForm.get('name').invalid ||
      this.updateForm.get('email').invalid
    ) {
      return;
    }
    const name = this.updateForm.get('name').value;
    const email = this.updateForm.get('email').value;

    if (this.imageFile) {
      console.log(this.updateForm.value, this.imageFile);
      this.authService
        .updateUser(name, email, this.imageFile)
        .subscribe((res) => {
          console.log(res);
          this.store.dispatch(Update({ user: res.user }));
          this.authService.updateLocalStorage(res.user);
          this.router.navigate(['/']);
        });
      return;
    }
    if (!this.imageFile) {
      console.log(this.updateForm.value, this.imagePicked);
      this.authService
        .updateUser(name, email, this.imagePicked)
        .subscribe((res) => {
          console.log(res);
          this.store.dispatch(Update({ user: res.user }));
          this.authService.updateLocalStorage(res.user);
          this.router.navigate(['/']);
        });
      return;
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_URL } from './const';
import { Meta, Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title1 = 'Project Management Application';
  constructor(
    private http: HttpClient,
    private title: Title,
    private meta: Meta,
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.title.setTitle('Project Management Application');
    this.meta.addTags([
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      },
      { name: 'keywords', content: 'Angular, Node, Express, MongoDB' },
      {
        name: 'description',
        content: 'This is a project management application',
      },
    ]);
  }
  ngOnInit(): void {
    this.authService.autoLogin();
    this.store.select('auth').subscribe((authState) => {
      console.log('authState', authState);
    });
  }
}

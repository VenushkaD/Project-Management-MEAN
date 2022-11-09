import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { API_URL } from './const';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private http: HttpClient,
    private title: Title,
    private meta: Meta
  ) {
    this.title.setTitle('Angular Universal Demo');
    this.http
      .get(API_URL + '/api')
      .subscribe((response) => console.log(response));
  }
}

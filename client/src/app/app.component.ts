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
    this.http
      .get(API_URL + '/api')
      .subscribe((response) => console.log(response));
  }
}

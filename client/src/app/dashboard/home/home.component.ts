import { Component, OnInit } from '@angular/core';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  constructor() {}

  ngOnInit(): void {}
}

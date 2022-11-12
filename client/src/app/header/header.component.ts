import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faPlus = faPlus;
  showPopup = false;
  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {}

  toggleProfile(event: Event) {
    this.showPopup = !this.showPopup;
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any }) {
    if (this.eRef.nativeElement.contains(event.target)) {
      return;
    } else {
      this.showPopup = false;
    }
  }
}

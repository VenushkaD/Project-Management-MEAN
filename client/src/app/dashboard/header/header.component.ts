import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faPlus = faPlus;
  showPopup = false;
  showAddProject = true;
  constructor(private eRef: ElementRef, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.url === '/create-project') {
        // console.clear();
        this.showAddProject = false;
        // * NavigationStart: Navigation starts.
        console.log('NavigationStart --- ', event.url);
      } else if (event instanceof NavigationStart && event.url === '/') {
        this.showAddProject = true;
      }
    });
  }

  addProject() {
    this.router.navigate(['/create-project']);
  }

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

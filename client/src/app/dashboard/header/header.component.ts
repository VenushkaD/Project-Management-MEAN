import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  faPlus = faPlus;
  showPopup = false;
  showAddProject = true;
  routerSub!: Subscription;
  constructor(private eRef: ElementRef, private router: Router) {}

  ngOnInit(): void {
    this.router.url === '/create-project'
      ? (this.showAddProject = false)
      : (this.showAddProject = true);
    this.routerSub = this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationStart &&
        (event.url === '/new' || event.url === '/edit')
      ) {
        this.showAddProject = false;
      } else if (event instanceof NavigationStart && event.url === '/') {
        this.showAddProject = true;
      }
    });
  }

  addProject() {
    this.router.navigate(['/new']);
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

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}

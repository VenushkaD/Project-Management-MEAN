import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { AppState } from 'src/app/store/app.reducer';
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
  user: User;
  profileImage = 'assets/images/avatar-300x300.jpg';
  constructor(
    private eRef: ElementRef,
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      this.user = authState.user;
      console.log(authState.user);

      if (this.user.imageUrl) {
        this.profileImage = this.user.imageUrl;
      }
    });
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

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}

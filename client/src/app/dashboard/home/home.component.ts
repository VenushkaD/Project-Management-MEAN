import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { Project } from 'src/app/models/project.model';
import { AppState } from 'src/app/store/app.reducer';
import { DashboardService } from '../dashboard.service';
import { SocketService } from '../socket.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  currentPage = 1;
  noOfPages: Number = 1;
  isLoading = false;
  projects: Project[] = [];
  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private socketService: SocketService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    let userId;
    this.store
      .select('auth')
      .pipe(take(1))
      .subscribe((data) => {
        userId = data.user._id;
      });

    this.socketService
      .listenToServer('project-added')
      .subscribe((project: Project) => {
        console.log(project);
        if (project.createdBy === userId) {
          this.projects = [project, ...this.projects];
          this.projects = this.projects.slice(0, 6);
          console.log(project);
          return;
        }
        project.members.forEach((member: any) => {
          if (member._id === userId) {
            console.log(project);

            this.projects = [project, ...this.projects];
            this.projects = this.projects.slice(0, 6);
          }
        });
      });

    this.socketService
      .listenToServer('project-updated')
      .subscribe((project: Project) => {
        console.log(project);
        console.log(project.members.find((m: any) => m._id === userId));
        if (
          this.projects.find((p: Project) => p._id === project._id) &&
          !project.members.find((m: any) => m._id === userId)
        ) {
          this.projects = this.projects.filter(
            (p: Project) => p._id !== project._id
          );
          return;
        }
        if (
          project.createdBy === userId ||
          project.members.find((m: any) => m._id === userId)
        ) {
          if (this.projects.find((p: Project) => p._id === project._id)) {
            this.projects = this.projects.map((p: Project) => {
              if (p._id === project._id) {
                return project;
              }
              return p;
            });
            return;
          } else {
            this.projects = [project, ...this.projects];
            this.projects = this.projects.slice(0, 6);
          }
          return;
        }
      });
    this.dashboardService.getProjects(1).subscribe((data) => {
      this.isLoading = false;
      this.noOfPages = data.numOfPages;
      this.projects = data.projects;
    });
    this.dashboardService.pageChangeListener().subscribe((data) => {
      this.isLoading = true;

      this.dashboardService.getProjects(data).subscribe((data) => {
        this.noOfPages = data.numOfPages;
        this.projects = data.projects;
        this.isLoading = false;
      });
    });
    this.dashboardService.searchResultListener().subscribe((data) => {
      this.isLoading = true;
      this.currentPage = 1;
      this.dashboardService.searchProjects(data).subscribe((data) => {
        console.log(data);
        this.noOfPages = data.numOfPages;
        this.projects = data.projects;
        this.isLoading = false;
      });
    });
  }

  nextPageClick() {
    if (this.currentPage >= this.noOfPages) {
      return;
    }
    this.currentPage++;
    this.dashboardService.pageNoChange.next(this.currentPage);
  }

  prevPageClick() {
    if (this.currentPage == 1) {
      return;
    }
    this.currentPage--;
    this.dashboardService.pageNoChange.next(this.currentPage);
  }

  onProjectClick(project: any) {
    this.router.navigate([`/view/${project._id}`]);
  }
}

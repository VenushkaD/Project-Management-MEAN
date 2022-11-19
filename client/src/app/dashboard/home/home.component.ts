import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '../dashboard.service';
import { Project } from '../project/project.model';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.dashboardService.getProjects(1).subscribe((data) => {
      this.isLoading = false;
      this.noOfPages = data.numOfPages;
      this.projects = data.projects;
    });
    this.dashboardService.pageChangeListener().subscribe((data) => {
      this.isLoading = true;

      this.dashboardService.getProjects(data).subscribe((data) => {
        console.log(data);
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

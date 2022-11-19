import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faPeopleGroup,
  faClock,
  faFileLines,
  faListCheck,
  faPenSquare,
  faBars,
  faClose,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { catchError, take, tap } from 'rxjs';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
})
export class ViewProjectComponent implements OnInit {
  faPeopleGroup = faPeopleGroup;
  faClock = faClock;
  faFileLines = faFileLines;
  faListCheck = faListCheck;
  faPenSquare = faPenSquare;
  faBars = faBars;
  faClose = faClose;
  faCircleCheck = faCircleCheck;
  showMenu = false;

  title = '';
  description = '';
  tasks = [];
  members = [];
  completed = false;
  dueDate: string;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    console.log(this.route.snapshot.params);
    const { id } = this.route.snapshot.params;
    this.dashboardService.getProject(id).subscribe((data) => {
      console.log(data);
      this.title = data.project.title;
      this.description = data.project.description;
      this.tasks = data.project.tasks;
      this.members = data.project.members;
      this.completed = data.project.completed;
      this.dueDate = moment(data.project.dueDate).format('LL');
      this.isLoading = false;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

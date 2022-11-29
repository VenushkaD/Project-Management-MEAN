import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faPeopleGroup,
  faClock,
  faFileLines,
  faListCheck,
  faPenSquare,
  faBars,
  faClose,
  faCircleCheck,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { catchError, take, tap } from 'rxjs';
import { User } from 'src/app/auth/user.model';
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
  faUserShield = faUserShield;
  showMenu = false;

  id: string;
  title = '';
  description = '';
  tasks = [];
  members = [];
  completed = false;
  dueDate: string;
  imageUrl: string;
  isLoading = false;
  createdBy: User;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    console.log(this.route.snapshot.params);
    const { id } = this.route.snapshot.params;
    this.dashboardService.getProject(id).subscribe((data) => {
      console.log(data);
      this.id = id;
      this.title = data.project.title;
      this.description = data.project.description;
      this.tasks = data.project.tasks;
      this.members = data.project.members;
      this.completed = data.project.completed;
      this.dueDate = moment(data.project.dueDate).format('LL');
      this.imageUrl =
        data.project.imageUrl || 'assets/images/project-placeholder.webp';
      this.isLoading = false;
      this.createdBy = data.project.createdBy;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  onEditClick() {
    this.router.navigate([`/edit/${this.id}`]);
  }
}

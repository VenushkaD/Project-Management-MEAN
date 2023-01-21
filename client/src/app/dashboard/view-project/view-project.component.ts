import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { Project } from 'src/app/models/project.model';
import { Task } from 'src/app/models/task.model';
import { getImageURL } from 'src/app/utils/getImageUrl';
import { DashboardService } from '../dashboard.service';
import { SocketService } from '../socket.service';
import { ViewTaskComponent } from './view-task/view-task.component';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
})
export class ViewProjectComponent implements OnInit {
  getImageURL = getImageURL;
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
  isLoading = false;
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private router: Router,
    private socketService: SocketService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    console.log(this.route.snapshot.params);
    const { id } = this.route.snapshot.params;
    this.socketService.listenToServer('project-updated').subscribe((data) => {
      console.log(data);
      if (data._id !== this.project._id) return;
      this.project = data;
      this.project.dueDate = moment(data.dueDate).format('LL');
      this.project.imageUrl =
        data.imageUrl || 'assets/images/project-placeholder.webp';
      this.isLoading = false;
    });
    this.dashboardService.getProject(id).subscribe((data) => {
      console.log(data);
      this.project = data.project;
      this.project.dueDate = moment(data.project.dueDate).format('LL');
      this.project.imageUrl =
        data.project.imageUrl || 'assets/images/project-placeholder.webp';
      this.isLoading = false;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  toggleCompleted() {
    this.project.completed = !this.project.completed;
  }

  onEditClick() {
    this.router.navigate([`/edit/${this.project._id}`]);
  }

  openDialog(task: Task) {
    this.dialog.open(ViewTaskComponent, {
      width: '700px',
      autoFocus: false,
      data: {
        projectId: this.project._id,
        task,
        members: this.project.members,
      },
    });
  }
}

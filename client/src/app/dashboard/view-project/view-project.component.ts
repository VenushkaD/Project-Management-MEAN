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
  faTrash,
  faPaperclip,
  faUserGroup,
  faPenToSquare,
  faCommentSlash,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { catchError, take, tap } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { Project } from 'src/app/models/project.model';
import { Task } from 'src/app/models/task.model';
import { getImageURL } from 'src/app/utils/getImageUrl';
import { DashboardService } from '../dashboard.service';
import { SocketService } from '../socket.service';
import { ChatComponent } from './chat/chat.component';
import { ViewTaskComponent } from './view-task/view-task.component';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
})
export class ViewProjectComponent implements OnInit {
  getImageURL = getImageURL;
  faPeopleGroup = faPeopleGroup;
  faUserGroup = faUserGroup;
  faClock = faClock;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faFileLines = faFileLines;
  faListCheck = faListCheck;
  faPenSquare = faPenSquare;
  faBars = faBars;
  faClose = faClose;
  faPaperclip = faPaperclip;
  faCircleCheck = faCircleCheck;
  faUserShield = faUserShield;
  faCommentSlash = faCommentSlash;
  faComment = faComment;
  showMenu = false;
  isLoading = false;
  project: Project;
  showChat = false;

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
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container',
      autoFocus: false,
      data: {
        projectId: this.project._id,
        task: { ...task },
        members: this.project.members,
      },
    });
  }

  openChat() {
    this.showChat = true;
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1);
  }

  daysLeft(date: string) {
    const d = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(d.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  onDeleteClicked() {
    console.log(this.project._id);

    this.dashboardService.deleteProject(this.project._id).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/']);
    });
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import {
  faBarsStaggered,
  faPaperclip,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/auth/user.model';
import { Task } from 'src/app/models/task.model';
import { DialogAssignMembersComponent } from '../../create-project/dialog-assign-members/dialog-assign-members.component';
import { DashboardService } from '../../dashboard.service';
import { DialogAssignTaskMembersComponent } from '../dialog-assign-task-members/dialog-assign-task-members.component';
import { getImageURL } from 'src/app/utils/getImageUrl';
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent implements OnInit {
  faFile = faFile;
  faBarsStaggered = faBarsStaggered;
  faPaperclip = faPaperclip;
  faUserGroup = faUserGroup;
  dialogRef: MatDialogRef<DialogAssignTaskMembersComponent>;
  attachments: File[] = [];
  isLoading: boolean = false;
  getImageURL = getImageURL;
  constructor(
    private dialog: MatDialog,
    private dialogRefViewTask: MatDialogRef<ViewTaskComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      projectId: string;
      task: Task;
      members: User;
    },
    private dashBoardService: DashboardService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  textAreaEnter(event: any) {
    if (event.keyCode == 13 && !event.shiftKey) {
      event.preventDefault();
      event.target.blur();
    }
  }

  addAttachment(ref: HTMLElement) {
    ref.click();
  }

  initTextArea(event: any) {
    console.log('event.target');

    event.target.setFocused(false);
  }

  openDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
      return;
    }
    this.dialogRef = this.dialog.open(DialogAssignTaskMembersComponent, {
      panelClass: 'dialog-task-assign-members',
      data: {
        members: this.data.members,
        assignedMembers: this.data.task.assignedMembers,
      },
    });
    this.dialogRef.afterClosed().subscribe((result: User[]) => {
      console.log(result);
      if (result) {
        this.data.task.assignedMembers = result;
      }
      this.dialogRef = null;
    });
  }

  handleFileInput(event: any) {
    // if (
    //   event.target.files[0].type !== 'image/png' &&
    //   event.target.files[0].type !== 'image/jpeg'
    // ) {
    //   return;
    // }
    if (!event.target.files[0]) {
      return;
    }
    if (event.target.files && event.target.files.length) {
      var fr = new FileReader();
      // fr.onload = () => {
      //   this.filePicked = fr.result as string;
      // };
      // fr.readAsDataURL(event.target.files[0]);
    }
    this.attachments.push(event.target.files[0]);
    console.log(this.attachments);
  }

  deleteMember(member: User) {
    this.data.task.assignedMembers = this.data.task.assignedMembers.filter(
      (m) => m._id !== member._id
    );
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.dashBoardService
      .updateProjectTask(
        this.data.projectId,
        { ...this.data.task, ...form.value },
        this.attachments
      )
      .subscribe((res) => {
        console.log(res);
        this.isLoading = false;
        this.dialogRefViewTask.close();
      });
  }

  downloadFile(fileUrl: string) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', getImageURL(fileUrl));
    link.setAttribute('download', fileUrl.split('---')[1].split('.')[0]);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  onFileDeleteURL(fileUrl: string) {
    this.data.task.documentUrls = this.data.task.documentUrls.filter(
      (file) => file !== fileUrl
    );
  }

  onFileDelete(file: File) {
    this.attachments = this.attachments.filter((f) => f !== file);
  }
}

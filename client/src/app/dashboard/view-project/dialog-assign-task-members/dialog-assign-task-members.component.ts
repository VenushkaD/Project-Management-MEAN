import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  _closeDialogVia,
} from '@angular/material/dialog';
import {
  faMagnifyingGlass,
  faThumbsDown,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/auth/user.model';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'dialog-assigned-members',
  templateUrl: './dialog-assign-task-members.component.html',
  styleUrls: ['./dialog-assign-task-members.component.css'],
})
export class DialogAssignTaskMembersComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;
  result: User[] = [];
  createdBy = '';
  assignedMembers: User[] = [];
  constructor(
    public dialogRef: MatDialogRef<DialogAssignTaskMembersComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      members: User[];
      assignedMembers: User[];
    },
    private http: HttpClient,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    console.log(this.data.members);
    this.assignedMembers = this.data.assignedMembers;
  }

  checkIsMember(id: string): boolean {
    return this.assignedMembers.some((member) => member._id === id);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitDialog() {
    this.dialogRef.close(this.assignedMembers);
  }

  onSearch(event: any) {
    let searchValue = event.target.value;

    this.result = this.data.members.filter((member) => {
      if (member.email.search(searchValue) !== -1) {
        return member;
      }
      return member;
    });

    // this.result = this.result.filter((member) => {
    //   if (member.email.search(searchValue) !== -1) {
    //     return member;
    //   }
    //   return;
    // });
    console.log(searchValue);
  }

  toggleMember(member: User) {
    if (!this.assignedMembers.some((m) => m._id === member._id)) {
      this.assignedMembers.push(member);
    } else {
      this.assignedMembers = this.assignedMembers.filter(
        (m) => m._id !== member._id
      );
    }
    console.log(member);
    console.log(this.assignedMembers);
  }
}

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
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'dialog-assigned-members',
  templateUrl: './dialog-assign-members.component.html',
  styleUrls: ['./dialog-assign-members.component.css'],
})
export class DialogAssignMembersComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;
  members: any = [];
  result: any = [];
  constructor(
    public dialogRef: MatDialogRef<DialogAssignMembersComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { members: [{ id: string; email: string }] },
    private http: HttpClient,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.members = this.data.members;
  }

  checkIsMember(id: string): boolean {
    return this.members.some((member) => member._id === id);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitDialog() {
    this.dialogRef.close({ data: { members: this.members } });
  }

  onSearch(event: any) {
    let searchValue = event.target.value;
    this.dashboardService.searchUsers(searchValue).subscribe((res) => {
      this.result = res.users;
    });
    // this.result = this.result.filter((member) => {
    //   if (member.email.search(searchValue) !== -1) {
    //     return member;
    //   }
    //   return;
    // });
    console.log(searchValue);
  }

  toggleMember(member: { _id: string; email: string }) {
    if (!this.members.some((m) => m._id === member._id)) {
      this.members.push(member);
    } else {
      this.members = this.members.filter((m) => m._id !== member._id);
    }
    console.log(member);
    console.log(this.members);
  }
}

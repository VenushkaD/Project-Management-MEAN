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

@Component({
  selector: 'dialog-assigned-members',
  templateUrl: './dialog-assign-members.component.html',
  styleUrls: ['./dialog-assign-members.component.css'],
})
export class DialogAssignMembersComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;
  members: { id: string; email: string }[] = [];
  result = [
    { id: '1001', email: 'john@gmail.com' },
    { id: '1003', email: 'nimal@gmail.com' },
    { id: '1004', email: 'kamal@gmail.com' },
    { id: '1005', email: 'sunimal@gmail.com' },
    { id: '1006', email: 'gayan@gmail.com' },
    { id: '1007', email: 'oliver@gmail.com' },
    { id: '1002', email: 'vdhambarage@gmail.com' },
    { id: '1008', email: 'barry@gmail.com' },
    { id: '1009', email: 'queen@gmail.com' },
  ];
  constructor(
    public dialogRef: MatDialogRef<DialogAssignMembersComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { members: [{ id: string; email: string }] }
  ) {}

  ngOnInit(): void {
    this.members = this.data.members;
  }

  checkIsMember(id: string): boolean {
    return this.members.some((member) => member.id === id);
  }

  closeDialog() {
    this.dialogRef.close({ data: { members: this.members } });
  }

  toggleMember(member: { id: string; email: string }) {
    if (!this.members.includes(member)) {
      this.members.push(member);
    } else {
      this.members = this.members.filter((m) => m !== member);
    }
  }
}

import { Component } from '@angular/core';
import { MatDialogRef, _closeDialogVia } from '@angular/material/dialog';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dialog-assigned-members',
  templateUrl: './dialog-assign-members.component.html',
  styleUrls: ['./dialog-assign-members.component.css'],
})
export class DialogAssignMembersComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;
  constructor(public dialogRef: MatDialogRef<DialogAssignMembersComponent>) {}

  ngOnInit(): void {
    console.log('dialog');
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

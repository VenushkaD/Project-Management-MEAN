import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAssignMembersComponent } from './dialog-assign-members/dialog-assign-members.component';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  createForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    assignMembers: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
  });

  imagePicked = '';
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.openDialog();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log(this.createForm.value);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAssignMembersComponent, {
      panelClass: 'my-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  handleFileInput(event: any) {
    let fileUrl: any = '';
    if (event.target.files && event.target.files.length) {
      var fr = new FileReader();
      fr.onload = () => {
        this.imagePicked = fr.result as string;
        console.log('file', fileUrl);
      };
      fr.readAsDataURL(event.target.files[0]);
    }
    this.imagePicked = fileUrl;
    this.imagePicked = this.createForm.value.image!;
  }
}

// @Component({
//   selector: 'dialog-assigned-members',
//   templateUrl: '/dialog-assign-members/dialog-assign-members.component.html',
//   styleUrls: ['/dialog-assign-members/dialog-assign-members.component.css'],
// })
// export class DialogContentExampleDialog {
//   constructor() {}

//   ngOnInit(): void {
//     console.log('dialog');
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAssignMembersComponent } from './dialog-assign-members/dialog-assign-members.component';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
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
    subTasks: new FormArray<any>([
      // new FormGroup({
      //   name: new FormControl('', Validators.required),
      // }),
      // new FormGroup({
      //   name: new FormControl('', Validators.required),
      // }),
    ]),
  });
  faXmark = faXmark;

  imagePicked = '';
  date!: Date;
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.date = new Date();
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

  get subTaskControls() {
    return (this.createForm.get('subTasks') as FormArray).controls;
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

  addTasks() {
    (this.createForm.get('subTasks') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
      })
    );
  }

  removeTasks(index: number) {
    (this.createForm.get('subTasks') as FormArray).removeAt(index);
  }
}

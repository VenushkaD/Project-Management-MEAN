import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogAssignMembersComponent } from './dialog-assign-members/dialog-assign-members.component';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Project } from '../Project';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  createForm!: FormGroup;
  faXmark = faXmark;

  imagePicked = '';
  imageFile: File | null = null;
  date!: Date;
  members: any = [];
  editMode = false;
  editData!: Project;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.date = new Date();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      if (params['id'] !== undefined) {
        console.log('edit mode');

        this.editMode = true;
        this.editData = {
          id: '1',
          title: 'test',
          description: 'description',
          image: null!,
          dueDate: new Date(),
          members: [
            { id: '1001', email: 'john@gmail.com' },
            { id: '1002', email: 'vdhambarage@gmail.com' },
          ],
          subTasks: [{ name: 'subtask' }, { name: 'subtask1' }],
        };
        this.members = this.editData.members;
      }
      this.initForm();
    });
  }

  initForm() {
    let title = '';
    let description = '';
    let image: File = null!;
    let dueDate = '';
    let assignMembers: { id: string; email: string }[] = [];
    let subTasks = new FormArray<any>([]);

    if (this.editMode) {
      title = this.editData.title;
      description = this.editData.description;
      image = this.editData.image;
      dueDate = this.editData.dueDate.toISOString();
      assignMembers = this.editData.members;
      if (this.editData.subTasks.length > 0) {
        for (let subTask of this.editData.subTasks) {
          subTasks.push(
            new FormGroup({
              name: new FormControl(subTask.name, Validators.required),
            })
          );
        }
      }
    }

    this.createForm = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      image: new FormControl<File>(image, [Validators.required]),
      assignMembers: new FormControl(assignMembers, [Validators.required]),
      dueDate: new FormControl(dueDate, [Validators.required]),
      subTasks: subTasks,
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.createForm.patchValue({ assignMembers: [...this.members] });
    console.log({ ...this.createForm.value, image: this.imageFile });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAssignMembersComponent, {
      panelClass: 'my-dialog',
      data: {
        members: [...this.members],
        result: [],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.members = result.data.members;
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  get subTaskControls() {
    return (this.createForm.get('subTasks') as FormArray).controls;
  }

  handleFileInput(event: any) {
    if (
      event.target.files[0].type !== 'image/png' &&
      event.target.files[0].type !== 'image/jpeg'
    ) {
      return;
    }

    if (event.target.files && event.target.files.length) {
      var fr = new FileReader();
      fr.onload = () => {
        this.imagePicked = fr.result as string;
        this.createForm.get('image')?.updateValueAndValidity();
      };
      fr.readAsDataURL(event.target.files[0]);
    }
    this.imageFile = event.target.files[0];
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

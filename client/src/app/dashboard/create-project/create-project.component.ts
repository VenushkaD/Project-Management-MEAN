import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogAssignMembersComponent } from './dialog-assign-members/dialog-assign-members.component';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Project } from '../Project';
import { DashboardService } from '../dashboard.service';
import { catchError, throwError } from 'rxjs';
import { getImageURL } from 'src/app/utils/getImageUrl';
import { Task } from 'src/app/models/task.model';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  createForm!: FormGroup;
  faXmark = faXmark;
  formError = false;
  formErrorMessage = 'Please fill all the fields';
  pickedImageFromFiles = false;
  getImageURL = getImageURL;

  imagePicked = '';
  imageFile: File | null = null;
  date!: Date;
  members: { _id: string; email: string }[] = [];
  editMode = false;
  editData: any;
  isLoading = false;
  createdBy = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.date = new Date();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      const id = params['id'];
      if (id !== undefined) {
        console.log('edit mode');
        this.dashboardService.getProject(id).subscribe((res) => {
          console.log(res.project);

          this.editMode = true;
          this.createdBy = res.project.createdBy._id;
          this.editData = {
            id: id,
            title: res.project.title,
            description: res.project.description,
            image: null,
            dueDate: new Date(res.project.dueDate),
            members: res.project.members,
            subTasks: res.project.tasks,
            completed: res.project.completed,
          };
          this.imagePicked = res.project.imageUrl;
          this.members = this.editData.members;
          this.initForm();
          this.isLoading = false;
        });
      } else {
        this.initForm();
        this.isLoading = false;
      }
    });
  }

  initForm() {
    let title = '';
    let description = '';
    let image: File = null!;
    let dueDate = '';
    let assignMembers: { id: string; email: string }[] = [];
    let completed: Boolean = false;
    let subTasks = new FormArray<any>([]);

    if (this.editMode) {
      title = this.editData.title;
      description = this.editData.description;
      image = this.editData.image;
      dueDate = this.editData.dueDate.toISOString();
      assignMembers = this.editData.members;
      completed = this.editData.completed;
      if (this.editData.subTasks.length > 0) {
        for (let subTask of this.editData.subTasks) {
          console.log(subTask);

          subTasks.push(
            new FormGroup({
              _id: new FormControl(subTask._id),
              name: new FormControl(subTask.name, Validators.required),
              progress: new FormControl(subTask.progress, [
                Validators.min(0),
                Validators.max(100),
              ]),
              description: new FormControl(subTask.description),
              documentUrls: new FormControl(subTask.documentUrls),
              assignedMembers: new FormControl(subTask.assignedMembers),
              dueDate: new FormControl(subTask.dueDate),
              checkList: new FormControl(subTask.checkList),
              cover: new FormControl(subTask.cover),
            })
          );
        }
      }
    }

    this.createForm = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      image: new FormControl<File>(image),
      assignMembers: new FormControl(assignMembers),
      dueDate: new FormControl(dueDate, [Validators.required]),
      completed: new FormControl(completed),
      subTasks: subTasks,
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.createForm.invalid) {
      this.formError = true;
      setTimeout(() => {
        this.formError = false;
        this.formErrorMessage = 'Please fill all the fields';
      }, 3000);
      return;
    }
    this.isLoading = true;
    console.log(this.createForm.value);
    this.createForm.patchValue({
      assignMembers: [...this.members],
    });
    console.log({ ...this.createForm.value, image: this.imageFile });
    if (this.editMode) {
      this.dashboardService
        .updateProject(
          this.editData.id,
          { ...this.createForm.value },
          this.imageFile || this.imagePicked
        )
        .pipe(
          catchError((err) => {
            this.isLoading = false;
            this.formError = true;
            this.formErrorMessage = err.error.error;
            setTimeout(() => {
              this.formError = false;
              this.formErrorMessage = 'Please fill all the fields';
            }, 3000);
            return throwError(() => err.error.error);
          })
        )
        .subscribe((res) => {
          console.log(res);
          this.isLoading = false;
          this.router.navigate([`/view/${this.editData.id}`]);
        });
      return;
    }
    this.dashboardService
      .createProject(this.createForm.value, this.imageFile)
      .pipe(
        catchError((err) => {
          console.log(err);
          this.isLoading = false;
          this.formError = true;
          this.formErrorMessage = err.error.error;
          setTimeout(() => {
            this.formError = false;
            this.formErrorMessage = 'Please fill all the fields';
          }, 3000);
          return throwError(() => err.error.error);
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/']);
        this.isLoading = false;
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAssignMembersComponent, {
      panelClass: 'my-dialog',
      data: {
        members: [...this.members],
        createdBy: this.createdBy,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.members = result.data.members;
      }
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  get subTaskControls() {
    return (this.createForm.get('subTasks') as FormArray).controls;
  }

  handleFileInput(event: any) {
    if (!event.target.files[0]) {
      return;
    }
    this.pickedImageFromFiles = true;
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
        progress: new FormControl(0, [Validators.min(0), Validators.max(100)]),
      })
    );
  }

  removeTasks(index: number) {
    (this.createForm.get('subTasks') as FormArray).removeAt(index);
  }
}

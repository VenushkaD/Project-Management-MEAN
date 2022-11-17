import { Component, Input, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Project } from './project.model';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  faPlus = faPlus;
  @Input() project: Project;
  constructor() {}

  tasksArray() {
    // return new Array(number);
    return this.project.tasks.slice(0, 3);
  }

  membersArray() {
    return this.project.members.slice(0, 3);
  }

  ngOnInit(): void {
    console.log(this.project.tasks.slice(0, 3));
  }
}

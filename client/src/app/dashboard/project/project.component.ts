import { Component, Input, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/project.model';
import { getImageURL } from 'src/app/utils/getImageUrl';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  faPlus = faPlus;
  @Input() project: Project;
  slicedDate = '';
  getImageURL = getImageURL;
  constructor() {}

  tasksArray() {
    // return new Array(number);
    return this.project.tasks.slice(0, 3);
  }

  membersArray() {
    return this.project.members.slice(0, 3);
  }

  ngOnInit(): void {
    const date = new Date(this.project.dueDate);
    this.slicedDate = date.toDateString().split(' ').slice(1).join(' ');
  }
}

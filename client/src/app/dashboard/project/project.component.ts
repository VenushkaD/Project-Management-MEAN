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
  daysLeft = 0;
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
    console.log('due date', this.project);

    const date = new Date(this.project.dueDate);
    this.slicedDate = date.toDateString().split(' ').slice(1).join(' ');
    const today = new Date();
    const diffTime = Math.abs(date.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.daysLeft = diffDays;
  }
}

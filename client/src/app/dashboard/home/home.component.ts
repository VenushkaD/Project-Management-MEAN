import { Component, OnInit } from '@angular/core';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Project } from '../project/project.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  projects: Project[] = [
    {
      id: 1,
      name: 'Project 1',
      description: 'This is a description of project 1',
      image: 'https://picsum.photos/200/300',
      members: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@gmail.com',
          imageUrl: 'https://picsum.photos/200/300',
        },
        {
          id: '1',
          name: 'John Doe',
          email: 'john@gmail.com',
          imageUrl: 'https://picsum.photos/200/300',
        },
        {
          id: '1',
          name: 'John Doe',
          email: 'john@gmail.com',
          imageUrl: 'https://picsum.photos/200/300',
        },
        {
          id: '1',
          name: 'John Doe',
          email: 'john@gmail.com',
          imageUrl: 'https://picsum.photos/200/300',
        },
      ],
      tasks: [
        {
          id: '1',
          name: 'Task 1',
          progress: 50,
        },
        {
          id: '1',
          name: 'Task 2',
          progress: 50,
        },
        {
          id: '1',
          name: 'Task 3',
          progress: 50,
        },
        {
          id: '1',
          name: 'Task 4',
          progress: 50,
        },
      ],
    },
    {
      id: 1,
      name: 'Project 1',
      description: 'This is a description of project 1',
      image: 'https://picsum.photos/200/300',
      members: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@gmail.com',
          imageUrl: 'https://picsum.photos/200/300',
        },
      ],
      tasks: [
        {
          id: '1',
          name: 'Task 1',
          progress: 50,
        },
        {
          id: '1',
          name: 'Task 2',
          progress: 50,
        },
      ],
    },
    {
      id: 1,
      name: 'Project 1',
      description: 'This is a description of project 1',
      image: 'https://picsum.photos/200/300',
      members: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@gmail.com',
          imageUrl: 'https://picsum.photos/200/300',
        },
      ],
      tasks: [],
    },
    {
      id: 1,
      name: 'Project 1',
      description: 'This is a description of project 1',
      image: 'https://picsum.photos/200/300',
      members: [],
      tasks: [],
    },
    {
      id: 1,
      name: 'Project 1',
      description: 'This is a description of project 1',
      image: 'https://picsum.photos/200/300',
      members: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@gmail.com',
          imageUrl: 'https://picsum.photos/200/300',
        },
      ],
      tasks: [],
    },
    {
      id: 1,
      name: 'Project 1',
      description: 'This is a description of project 1',
      image: 'https://picsum.photos/200/300',
      members: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@gmail.com',
          imageUrl: 'https://picsum.photos/200/300',
        },
      ],
      tasks: [],
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

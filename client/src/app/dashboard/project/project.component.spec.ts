import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { Project } from './project.model';

fdescribe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectComponent],
    }).compileComponents();

    ProjectComponent.prototype.project = {
      _id: '1',
      title: 'Project 1',
      description: 'Project 1 description',
      dueDate: '2021-05-01T00:00:00.000Z',
      tasks: [
        {
          name: 'Task 1',
          description: 'Task 1 description',
          dueDate: '2021-05-01T00:00:00.000Z',
          assignedMembers: [],
          _id: '1',
          cover: '',
          documentUrls: [],
          progress: 0,
          checkList: [
            {
              name: 'Checklist 1',
              checked: false,
            },
          ],
        },
      ],
      members: [
        {
          id: '1',
          name: 'Member 1',
          email: '',
          imageUrl: '',
        },
      ],
      completed: false,
      createdBy: {
        _id: '1',
        name: 'Member 1',
        email: '',
        password: '',
        token: '',
        imageUrl: '',
      },
      imageUrl: '',
    };

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // component.project = {
    //   _id: '1',
    //   title: 'Project 1',
    //   description: 'Project 1 description',
    //   dueDate: '2021-05-01T00:00:00.000Z',
    //   tasks: [
    //     {
    //       name: 'Task 1',
    //       description: 'Task 1 description',
    //       dueDate: '2021-05-01T00:00:00.000Z',
    //       assignedMembers: [],
    //       _id: '1',
    //       cover: '',
    //       documentUrls: [],
    //       progress: 0,
    //       checkList: [
    //         {
    //           name: 'Checklist 1',
    //           checked: false,
    //         },
    //       ],
    //     },
    //   ],
    //   members: [
    //     {
    //       id: '1',
    //       name: 'Member 1',
    //       email: '',
    //       imageUrl: '',
    //     },
    //   ],
    //   completed: false,
    //   createdBy: {
    //     _id: '1',
    //     name: 'Member 1',
    //     email: '',
    //     password: '',
    //     token: '',
    //     imageUrl: '',
    //   },
    //   imageUrl: '',
    // };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a project', () => {
    expect(component.project).toBeTruthy();
  });

  it('should have a slicedDate', () => {
    expect(component.slicedDate).toBeTruthy();
  });

  it('should have a daysLeft', () => {
    expect(component.daysLeft).toBeTruthy();
  });

  it('should have a tasks', () => {
    expect(component.project.tasks).toBeTruthy();
  });

  it('should have a members', () => {
    expect(component.project.members).toBeTruthy();
  });
});

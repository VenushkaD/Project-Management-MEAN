import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from '../dashboard.service';
import { SocketService } from '../socket.service';

import { ViewProjectComponent } from './view-project.component';

describe('ViewProjectComponent', () => {
  let component: ViewProjectComponent;
  let fixture: ComponentFixture<ViewProjectComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(async () => {
    const dashboardServiceSpy = jasmine.createSpyObj('DashboardService', [
      'getProject',
      'getProjects',
    ]);
    dashboardServiceSpy.getProject.and.returnValue({
      subscribe: () => {
        return { msg: 'success', project: {} };
      },
    });

    dashboardServiceSpy.getProjects.and.returnValue({
      subscribe: () => {
        return {
          msg: 'success',
          projects: [],
          numOfPages: 1,
          totalProjects: 1,
        };
      },
    });

    await TestBed.configureTestingModule({
      declarations: [ViewProjectComponent],
      providers: [
        { provide: DashboardService, useValue: { dashboardServiceSpy } },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        SocketService,
        MatDialog,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a getProject method', (done) => {
    expect(component.project).toBeTruthy();
    expect(component.project).toBeInstanceOf(Function);
    expect(component.project).toBeInstanceOf(Object);
    done();
  });
});

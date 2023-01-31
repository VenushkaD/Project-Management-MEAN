import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let projectId = '';
  let dashboardServiceSpy = jasmine.createSpyObj('DashboardService', [
    'getProjects',
    'getProject',
  ]);
  dashboardServiceSpy.getProjects.and.returnValue({ subscribe: () => {} });
  dashboardServiceSpy.getProject.and.returnValue({ subscribe: () => {} });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: DashboardService, useValue: dashboardServiceSpy }],
    }).compileComponents();
    service = TestBed.inject(dashboardServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a getProjects method', (done) => {
    console.log('res');

    expect(service.getProjects).toBeTruthy();
    expect(service.getProjects).toBeInstanceOf(Function);
    service.getProjects(1).subscribe((res) => {
      console.log(res);

      expect(res).toBeTruthy();
      expect(res).toContain('msg');
      expect(res).toContain('projects');
      expect(res).toContain('numOfPages');
      expect(res).toContain('totalProjects');
      expect(res.projects).toBeInstanceOf(Array);
      expect(res.numOfPages).toBeInstanceOf(Number);
      expect(res.totalProjects).toBeInstanceOf(Number);
      done();
    });
  });

  it('should have a getProject method', (done) => {
    expect(service.getProject).toBeTruthy();
    expect(service.getProject).toBeInstanceOf(Function);
    service.getProject('333').subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toContain('msg');
      expect(res.msg).toBe('success');
      expect(res).toContain('project');
      expect(res.project).toBeInstanceOf(Object);
      done();
    });
  });
});

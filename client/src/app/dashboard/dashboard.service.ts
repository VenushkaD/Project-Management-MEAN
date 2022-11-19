import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Project } from './project/project.model';
import { API_URL } from '../const';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  pageNoChange: Subject<Number> = new Subject<Number>();
  searchResultChange: Subject<string> = new Subject<string>();
  searchKey: string = '';
  pageNo: Number = 1;

  pageChangeListener(): Observable<Number> {
    return this.pageNoChange.asObservable();
  }

  searchResultListener(): Observable<string> {
    return this.searchResultChange.asObservable();
  }

  getProjects(pageNo: Number) {
    this.pageNo = pageNo;
    return this.http.get<{
      msg: string;
      projects: Project[];
      numOfPages: Number;
      totalProjects: Number;
    }>(`${API_URL}/project?page=${pageNo}&search=${this.searchKey}`);
  }

  getProject(id: string) {
    return this.http.get<{
      msg: string;
      project: Project;
    }>(`${API_URL}/project/${id}`);
  }

  searchProjects(search: string) {
    this.searchKey = search;
    console.log('search key', search);

    return this.http.get<{
      msg: string;
      projects: Project[];
      numOfPages: Number;
      totalProjects: Number;
    }>(`${API_URL}/project?search=${search}`);
  }

  createProject(project: any, image: File) {
    if (typeof image === 'string') {
      return this.http.post<{ msg: string; project: Project }>(
        `${API_URL}/project`,
        project
      );
    }

    const formData = new FormData();
    console.log('project', project);

    formData.append('title', project.title);
    formData.append('description', project.description);
    formData.append('dueDate', project.dueDate.toString());
    formData.append('projectImage', image);
    if (project.assignMembers?.length > 0) {
      formData.append('members', JSON.stringify(project.assignMembers));
    }
    if (project.subTasks?.length > 0) {
      formData.append('tasks', JSON.stringify(project.subTasks));
    }
    formData.append('createdBy', '6375f98509577277d6d1c60f');
    return this.http.post<{ msg: string; project: Project }>(
      `${API_URL}/project`,
      formData
    );
  }

  searchUsers(search: string) {
    return this.http.get<{ msg: string; users: any[] }>(
      `${API_URL}/users?search=${search}`
    );
  }
}

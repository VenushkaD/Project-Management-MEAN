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
}

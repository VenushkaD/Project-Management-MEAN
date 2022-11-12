import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Router, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HeaderComponent } from '../header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [DashboardComponent, HeaderComponent, SearchComponent, ProjectComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', canActivate: [AuthGuard], component: DashboardComponent },
    ]),
  ],
})
export class DashboardModule {}

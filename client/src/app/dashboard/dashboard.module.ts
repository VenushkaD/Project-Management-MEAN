import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Router, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './project/project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogAssignMembersComponent } from './create-project/dialog-assign-members/dialog-assign-members.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SearchComponent,
    ProjectComponent,
    CreateProjectComponent,
    HomeComponent,
    DialogAssignMembersComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    NgScrollbarModule,
    MatInputModule,
  ],
})
export class DashboardModule {}

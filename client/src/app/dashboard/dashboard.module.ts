import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Router, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ViewProjectComponent } from './view-project/view-project.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthClientModule } from './auth-client.module';
import { ViewTaskComponent } from './view-project/view-task/view-task.component';
import { DialogAssignTaskMembersComponent } from './view-project/dialog-assign-task-members/dialog-assign-task-members.component';
import { MemberComponent } from './view-project/view-task/member/member.component';
import { ChatComponent } from './view-project/chat/chat.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SearchComponent,
    ProjectComponent,
    CreateProjectComponent,
    HomeComponent,
    DialogAssignMembersComponent,
    ViewProjectComponent,
    HeaderComponent,
    ViewTaskComponent,
    DialogAssignTaskMembersComponent,
    MemberComponent,
    ChatComponent,
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
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    FormsModule,
  ],
})
export class DashboardModule {}

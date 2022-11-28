import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { HTTPInterceptor } from './http-interceptor.service';

@NgModule({
  providers: [
    DashboardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPInterceptor,
      multi: true,
    },
  ],
})
export class AuthClientModule {}

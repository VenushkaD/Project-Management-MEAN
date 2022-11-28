import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './auth/auth.guard';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appReducer } from './store/app.reducer';
import { AuthClientModule } from './dashboard/auth-client.module';
import { HeaderComponent } from './dashboard/header/header.component';

@NgModule({
  declarations: [AppComponent, LandingComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    BrowserAnimationsModule,
    AuthClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

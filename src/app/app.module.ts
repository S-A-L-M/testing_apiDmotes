import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SigninComponent } from './views/auth/signin/signin.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Error404Component } from './views/error404/error404.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { GraphicsComponent } from './views/dashboard/graphics/graphics.component';
import { ValuesComponent } from './views/personal/values/values.component';







@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    Error404Component,
    GraphicsComponent,
    ValuesComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
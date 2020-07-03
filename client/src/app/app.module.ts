import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ROUTING } from './app.routing';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RootComponent } from './root/root.component';
import { CompareValidatorDirective } from './shared/compare-validator.directive';
import { AuthGuard } from './shared/auth.guard';
import { UserService } from './shared/user.service';



@NgModule({
  declarations: [
  	RootComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    CompareValidatorDirective
  ],
  imports: [
    BrowserModule,
    ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [RootComponent]
})
export class AppModule { }

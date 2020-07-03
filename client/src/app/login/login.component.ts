import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {

  public user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = new User();
  }

  validateLogin() {
    if (this.user.email && this.user.password) {
      this.userService.validateLogin(this.user).subscribe(result => {
        console.log('result is ', result);
        if (result['status'] === 'Success') {
          this.router.navigate(['/home']);
        } else {
          alert('Wrong Username Password');
        }
      }, error => {
        console.log('error is ', error.error);
        alert(error.error)
      });
    } else {
      alert('Enter Username and Password');
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { compareValidator } from '../shared/compare-validator.directive'
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, compareValidator('password')]]
    })
  }

  saveUser() {
    const { confirmPassword, ...user } = this.userForm.value;
    this.userService.addUser(user).subscribe(
      user =>{ console.log(user);
      this.userForm.reset();
      this.router.navigate(['/home'])
      },
      error => {
        console.log(error.error);
        alert(error.error);
      })
  }

  get firstName() {
    return this.userForm.get('firstName')
  }
  get lastName() {
    return this.userForm.get('lastName')
  }
  get email() {
    return this.userForm.get('email')
  }
  get password() {
    return this.userForm.get('password')
  }
  get confirmPassword() {
    return this.userForm.get('confirmPassword')
  }

}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   
 @Output() messageEvent = new EventEmitter<any>();

  signInFormVisible = true;

  email: any;
  password: any;
  name: any;

  constructor(private userService: UserService) {
  }

  public isLoggedIn: any;

  @Output('change') change = new EventEmitter<any>();
  isLogIn = false;

  makeSignInFormVisible() {
    this.signInFormVisible = true;
  }

  makeSignUpFormVisible() {
    this.signInFormVisible = false;
  }

  login() {
    console.log("user tried to login");
    this.userService.login(this.email, this.password, this.name);
    this.isLoggedIn = true;
  }


  signUp() {
    console.log("user tried to signUp")
    this.userService.signUp(this.email, this.password, this.name);
    this.isLoggedIn = true;
  }
}

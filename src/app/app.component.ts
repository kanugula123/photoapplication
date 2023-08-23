import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MessageService } from './message.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PhotoApplication';

  public isLoggedIn: any;

  constructor(public userService: UserService, public messageService: MessageService) {
  }

}


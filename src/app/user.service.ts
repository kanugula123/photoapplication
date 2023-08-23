import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { FIREBASE_APP_NAME } from '@angular/fire/compat';
import { FirebaseApp } from '@angular/fire/app';
import { User } from './Model/User';
import { HttpClient } from '@angular/common/http';
import { stringify, v4 as uuidv4 } from 'uuid';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  user: Observable<firebase.default.User | null>
  defaultProfilePhoto: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private http: HttpClient,
  private messageService: MessageService) {
    this.user = firebaseAuth.authState;
    /*firebaseAuth.authState.subscribe(x => console.log(x));*/
    this.user.subscribe(
      userInfo => {
        /*console.log("User Info is available", userInfo)*/
        let promise = Promise.resolve(userInfo?.getIdToken());
        this.printIdToken(promise);
      }
    )
  }

  ngOnInit() {
  }

  async canActivate(): Promise<boolean> {
    if (await this.firebaseAuth.currentUser) {
      return true;
    }
    return false;
  }
  userIdToken: any;
  printIdToken(idToken: any) {
    idToken.then(
      (idTokenValue: any) => {
        localStorage.setItem('userIdToken', idTokenValue)
        this.userIdToken = localStorage.getItem('userIdToken');
        console.log("Id Token Value: ", idTokenValue)
      });
  
  }

  public isLoggedIn: any;

  signUp(email: string, password: string, name: string) {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        /*value.user?.updateProfile({
          displayName: 'angular-project'
        });
        localStorage.setItem('userEmail', "" + value.user?.email)*/
        localStorage.setItem('userEmail', "" + value.user?.email)
        console.log('Success!', value);
        this.registerUser(email, name)
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.messageService.newMessage(err.message);
      });
  }

  registerUser(email: string, name: string) {
    const generateRandomNumber = (count: any, max: any) => {
      const r = Math.floor(Math.random() * max);
      return r;
    }
    let user: User = {
      id: generateRandomNumber(3,10),
      name: name,
      email: email,
      profilePhotoUrl: this.defaultProfilePhoto
    }
    this.isLoggedIn = true;
    this.http.post<User>("http://3.96.178.127:8080/api/add-user", user).subscribe(data => {
      console.log("User-Name: ", data.name)
    })
    console.log('Registered Successfully!', name);
    this.router.navigate(['albums'])
  }

  login(email: string, password: string, name: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log("Token", value.user?.getIdToken());
        localStorage.setItem('userEmail', "" + value.user?.email)
        console.log('Nice, it worked');
        this.isLoggedIn = true;
        this.router.navigate(['albums'])
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.messageService.newMessage(err.message);
      });
  }

  get isLogged(): boolean {
    const user = localStorage.getItem('user');
    return (user !== null)
  }

  logoutUser() {
    this.isLoggedIn = false;
    localStorage.clear();
    return this.firebaseAuth.signOut().then(
      () => {
        localStorage.removeItem('userEmail')
        localStorage.removeItem('userIdToken')
        sessionStorage.clear();
        console.log('user sign out');
        this.router.navigate(['login']);
      },
      error => {
        console.log('Error logging out');
      },
    )
  }
}

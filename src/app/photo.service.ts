import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Album } from './Model/Album';
import { Photo } from './Model/Photo';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient, private userService: UserService, public router: Router) { }
  getAllPhotos() {
    return this.http.get("http://3.96.178.127:8080/api/photo");
  }

  getPhotoById(photoId: string) {
    return this.http.get<Photo>("http://3.96.178.127:8080/api/photo/" + photoId);
  }

  addPhoto(photos: { albumId: string, createdBy: string, dateCreated: Date, photoUrl: string }) {
    console.log(photos)
    this.http.post<Photo>("http://3.96.178.127:8080/api/add-photo", photos, { headers: this.getHeader() }).subscribe(data => {
      console.log("albumId: ", data.albumId)
  });
  }

  updatePhoto(photo: { id: string, albumId: string, createdBy: string, dateCreated: Date, photoUrl: string }) {
    this.http.patch<Photo>("http://3.96.178.127:8080/api/update-photo/" + photo.id, photo, { headers: this.getHeader() }).subscribe(data => {
      console.log(data.id)
    })
  }

  deletePhoto(id: string) {
    this.http.delete<Photo>("http://3.96.178.127:8080/api/delete-photo?photoId=" + id, { headers: this.getHeader() }).subscribe(data => {
      console.log(data)
    })
  }

  getHeader() {
    const token = localStorage.getItem('userIdToken')
    console.log("Token value: ", token);
    return token ? new HttpHeaders().set('idToken', token) : undefined;
  }
}


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from './Model/Album';
import { Photo } from './Model/Photo';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient, private router: Router) { }

  album: Album = new Album;

  album$: any;

  photos: Photo[] = [];

  albumId: any;

  getHeader() {
    const token = localStorage.getItem('userIdToken')
    console.log("Token value: ", token);
    return token ? new HttpHeaders().set('idToken', token) : undefined;
  }

  getAlbumById(albumId: string) {
    return this.http.get<Album>("http://3.96.178.127:8080/api/album/" + albumId);
  }

  getAllAlbums() {
    return this.http.get("http://3.96.178.127:8080/api/album")
  }

  addAlbum(album: { id: string, name: string, coverPhotoUrl: string, email: string, dateCreated: Date }) {
    this.http.post<Album>("http://3.96.178.127:8080/api/add-album", album, { headers: this.getHeader() }).subscribe(data => {
      this.albumId = data.id;
      console.log(data.id)
    })
  }

  updateAlbum(album: { id: string, name: string, coverPhotoUrl: string, email: string, dateCreated: Date }) {
    this.http.put<Album>("http://3.96.178.127:8080/api/update-album", album, { headers: this.getHeader() }).subscribe(data => {
      console.log(data.id)
    })
  }

  deleteAlbum(id: string) {
    this.http.delete<Album>("http://3.96.178.127:8080/api/delete-album?albumId=" + id, { headers: this.getHeader() }).subscribe(data => {
        console.log(data)
      })
  }

  setCoverPic(id: string, photoId:string) {
    this.http.patch<Album>("http://3.96.178.127:8080/api/album123/" + id + "/photo?photoId=" + photoId, id).subscribe(() => { console.log("Cover Photo") })
    this.router.navigate(['albums'])
  }
}


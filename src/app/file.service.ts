import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  getHeader() {
    return new HttpHeaders();
  }

  uploadFile(file: File) {
    var formData = new FormData();
    formData.append("file", file);
    return this.http.post("http://3.96.178.127:8080/", formData)
  }

  //getFile(file: any) {
    //return this.http.get("http://localhost:8080/view?key=" + file, {
      //headers: this.getHeader().append('Accept', '*/*').append('Authorization', 'token')
    //})
  //}
}

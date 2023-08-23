import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from './Model/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  commentId: any;

  getHeader() {
    const token = localStorage.getItem('userIdToken')
    console.log("Token value: ", token);
    return token ? new HttpHeaders().set('idToken', token) : undefined;
  }

  getCommentById(commentId: string) {
    return this.http.get<Comment>("http://3.96.178.127:8080/api/comment/" + commentId);
  }

  getAllComments() {
    return this.http.get("http://3.96.178.127:8080/api/all-comment")
  }

  addComment(comment: { id: string, photoId: string, message: string, createdBy: string, dateCreated: Date }) {
    this.http.post<Comment>("http://3.96.178.127:8080/api/add-comment", comment, { headers: this.getHeader() }).subscribe(data => {
      this.commentId = data;
      console.log(data)
    })
  }

  updateComment(comment: { id: string, photoId: string, message: string, createdBy: string, dateCreated: Date }) {
    this.http.put<Comment>("http://3.96.178.127:8080/api/update-comment", comment, { headers: this.getHeader() }).subscribe(data => {
      console.log(data)
    })
  }

  deleteComment(id: string) {
    this.http.delete<Comment>("http://3.96.178.127:8080/api/delete-comment?commentId=" + id, { headers: this.getHeader() }).subscribe(data => {
      console.log(data)
    })
  }

  deleteAllComment(id: string) {
    this.http.delete<Comment>("http://3.96.178.127:8080/api/delete-all-comments", { headers: this.getHeader() }).subscribe(data => {
      console.log(data)
    })
  }
}

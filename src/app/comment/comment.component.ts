import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { Comment } from '../Model/Comment';
import { MyPhotoComponent } from '../my-photo/my-photo.component';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private commentService: CommentService, private route: ActivatedRoute, private photoService: PhotoService) { }

  comments$: any;

  comments: any;

  commentId: string = '01';

  photo$: any;

  commentsList: Comment[] = [];

  isAvailable: boolean = false;
  isAvailable1: boolean = false;
  isSort: boolean = false;

  target: string[] = [];
  pid: any;
  ngOnInit(): void {
    /*this.route.paramMap.subscribe(params => {
      this.photoId = params.get('photoId');
      console.log('Got Photo Id:', this.photoId);
    });*/
  }

  getAllComments() {
    if (this.isAvailable = !this.isAvailable) {
      this.isAvailable = true
    }
    this.pid = localStorage.getItem("PhotoId")
    console.log("Target: ", event)
    console.log("PhotoId: ",this.pid);
    localStorage.removeItem("PhotoId")
    this.commentService.getAllComments().subscribe(data => {
      this.comments$ = data;
    });
    //634b32473a45457680f5b204
    /*this.comments$.forEach((data: any) => {
      console.log(data)
    })*/
    return this.isAvailable;
  }
  getCommentsByPhotoId() {
    if (this.isAvailable1 = !this.isAvailable1) {
      this.isAvailable1 = true
    }
    this.pid = localStorage.getItem("PhotoId")
    this.photoService.getPhotoById(this.pid).subscribe(c => {
      this.commentsList = c.comment;
      console.log("Comment from photo", c.comment);
    });
    this.comments = this.commentService.getCommentById(this.commentId).subscribe(data => {
      this.comments = data
      console.log(this.comments)
    })
    return this.isAvailable1;
  }

  sortComments(commentsList: any[]) {
    if (this.isSort = !this.isSort) {
      this.isSort = true
    }
    var a: any[] = commentsList;
    var len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
      for (j = i + 1; j < len; j++) {
        var temp = {};
        if (this.isSort) {
          if (a[i].dateCreated < a[j].dateCreated) {
            temp = a[i];
            a[i] = a[j];
            a[j] = temp;
          }
        } else {
          if (a[i].dateCreated > a[j].dateCreated) {
            temp = a[i];
            a[i] = a[j];
            a[j] = temp;
          }
        }
      }
    }
    for (var i = 0; i < a.length; i++) {
      console.log(a[i]);
    }
  }
}

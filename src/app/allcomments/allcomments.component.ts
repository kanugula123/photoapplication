import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comment.service';
import { Comment } from '../Model/Comment';

@Component({
  selector: 'app-allcomments',
  templateUrl: './allcomments.component.html',
  styleUrls: ['./allcomments.component.css']
})
export class AllcommentsComponent implements OnInit {

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  isAvailable: boolean = false;
  comments$: any;
  isSort: boolean = false;
  commentsList: Comment[] = [];

  getAllComments() {
    if (this.isAvailable = !this.isAvailable) {
      this.isAvailable = true
    }
    this.commentService.getAllComments().subscribe(data => {
      this.comments$ = data;
    });
    return this.isAvailable;
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

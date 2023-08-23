import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlbumDetailsComponent } from '../album-details/album-details.component';
import { Photo } from '../Model/Photo';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { PhotoService } from '../photo.service';
import { Comment } from '../Model/Comment';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-my-photo',
  templateUrl: './my-photo.component.html',
  styleUrls: ['./my-photo.component.css']
})
export class MyPhotoComponent implements OnInit {

 constructor(public albumService: AlbumService, private route: ActivatedRoute, public photoService: PhotoService, private commentService: CommentService) { }

 photos: Photo[] = []
  albumId: any;
  album: any;
  photoId: any;
  message: any;
  @Output() change: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.albumId = params.get('albumId');
      console.log('Got album Id:', this.albumId);
    });
  }

  getAlbumById() {
    this.albumService.getAlbumById(this.albumId).forEach(data => {
      this.album = data
      this.photos = data.photo;
      this.photoId = this.photos.forEach(p => {
        /*        this.photoId = p.id*/
        if (p.albumId == this.albumId) {
          console.log("Photo: ", p.id)
          localStorage.setItem("PhotoId", p.id);
          /*this.change.emit(this.photoId);*/
          return p.id
        }
      })
      console.log(this.photoId);
      console.log(this.photos)
    })
  }

  getPhotoId() {
    this.photos.filter(photo => { photo.albumId == this.albumId }).forEach(p => {
      this.photoId = p.id
      this.change.emit(this.photoId);
      /*return p.id*/
    })
  }

  addComment() {
    var comment: Comment = {
      id: "01",
      photoId: localStorage.getItem("PhotoId"),
      message: this.message,
      createdBy: localStorage.getItem("userEmail"),
      dateCreated: new Date()
    }
    this.commentService.addComment(comment);
  }
}

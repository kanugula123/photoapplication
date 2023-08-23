import { HttpResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { FileService } from '../file.service';
import { Album } from '../Model/Album';
import { Photo } from '../Model/Photo';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent implements OnInit {

  albumId: any
  albumTitle: any;
  file = File;
  filename: any;
  todayString: any = new Date().toLocaleString();
  constructor(private route: ActivatedRoute, private fileService: FileService, private albumService: AlbumService, private photoService: PhotoService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.albumId = params.get('albumId');
      console.log('Got album Id:', this.albumId);
    });
  }

  createAlbum($event: any) {
    this.file = $event.target.files[0];
    console.log("Event: ", $event)
    var formData = new FormData();
    formData.append("file", this.file.name);
    const name = this.file.name;
    console.log('File: ', this.file.name);
    this.fileService.uploadFile($event.target.files[0]).subscribe(
      fileResponse => {
        console.log("File received: ", fileResponse)
      })
    this.saveAlbum(name);
  }

  saveAlbum(fileName: any) {
    var album: Album = {
      id: "",
      name: this.albumTitle,
      coverPhotoUrl: "http://3.96.178.127:8080/view?key=" + fileName,
      email: localStorage.getItem("userEmail"),
      dateCreated: this.todayString,
      photo: Array<Photo>()
    };
    this.albumService.addAlbum(album);
  }

  addPhotoToAlbum(fileName: any) {
    var photo: Photo = {
      id: "",
      albumId: this.albumService.albumId,
      photoUrl: "http://3.96.178.127:8080/view?key=" + fileName,
      createdBy: localStorage.getItem("userEmail"),
      dateCreated: this.todayString,
      comment:[]
    }
    this.photoService.addPhoto(photo);
  }

  submit() {
    const name = this.file.name;
    this.addPhotoToAlbum(name)
  }
}

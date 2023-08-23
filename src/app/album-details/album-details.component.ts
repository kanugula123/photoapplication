import { HttpClient } from '@angular/common/http';
import { newArray } from '@angular/compiler/src/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
/*import * as EventEmitter from 'events';*/
import { timer } from 'rxjs';
import { AlbumService } from '../album.service';
import { Album } from '../Model/Album';
import { Photo } from '../Model/Photo';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  album$: any;

  albumId: any;

  album: Album = new Album;

  @Input('photos') photos: Photo[] = [];

  @Output('click') click = new EventEmitter();

  isCorrect: any;

  constructor(private route: ActivatedRoute, public albumService: AlbumService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.albumId = params.get('albumId');
      /*console.log('Got album Id:', this.albumId);*/
    });
    /*this.album$ = this.albumService.getAlbumById(this.albumId)*/
  }

  /*getAlbumById() {
    this.isCorrect = true;
    this.http.get<Album>("http://localhost:8080/api/album/" + this.albumId).forEach(data => {
      this.album = data
      this.photos = this.album.photo;
      console.log(this.photos)
      *//*if (this.photos !== undefined) {
        console.log(this.photos.length)
      }*//*
    })
    *//*this.click.emit({ newValue: this.photos })*//*
      *//*.pipe(delayWhen(() => timer(1000)))
      .subscribe(data => {
        data
      *//*this.album$ = data;
      return this.album$;*//*
      *//*this.album$ = data;*//*
      *//*console.log(data)*//*
    })*//*
    *//*return this.album;*//*
  }*/

  getAlbumById() {
    this.albumService.getAlbumById(this.albumId).forEach(data => {
      this.album = data
      this.photos = this.album.photo;
      console.log(this.photos)
      /*if (this.photos !== undefined) {
        console.log(this.photos.length)
      }*/
    })
  }
}

function delay(arg0: number): import("rxjs").OperatorFunction<Album, unknown> {
    throw new Error('Function not implemented.');
}

function wait(arg0: number): import("rxjs").OperatorFunction<Album, unknown> {
    throw new Error('Function not implemented.');
}

function delayWhen(arg0: () => import("rxjs").Observable<number>): import("rxjs").OperatorFunction<Album, unknown> {
    throw new Error('Function not implemented.');
}

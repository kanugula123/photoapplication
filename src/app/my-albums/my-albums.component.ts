import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../Model/Album';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
export class MyAlbumsComponent implements OnInit {

  myData: any;
  myData$: any;

  constructor(public albumService: AlbumService) { }

  public album$: Album[] = [];

  ngOnInit() {
    this.myData$ = this.albumService.getAllAlbums();
  }
}

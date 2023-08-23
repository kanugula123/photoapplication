import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Observable, of } from 'rxjs';
import { Photo } from '../Model/Photo';
import { Album } from '../Model/Album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  myData: any;
  myData$: any;

  constructor(public photoService: PhotoService, public albumService: AlbumService) { }

  public photos$: Photo[] = [];

  ngOnInit() {
    this.myData$ = this.photoService.getAllPhotos()
  }
  }


function take(arg0: number): import("rxjs").OperatorFunction<Object, unknown> {
    throw new Error('Function not implemented.');
}

function tap(arg0: any): import("rxjs").OperatorFunction<Object, unknown> {
    throw new Error('Function not implemented.');
}

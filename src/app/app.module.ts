import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment.prod';
import { UserService } from './user.service';
import { ProfileComponent } from './profile/profile.component';
import { MyAlbumsComponent } from './my-albums/my-albums.component';
import { LoginComponent } from './login/login.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { UploadPictureComponent } from './upload-picture/upload-picture.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyPhotoComponent } from './my-photo/my-photo.component';
import { CommentComponent } from './comment/comment.component';
import { AllcommentsComponent } from './allcomments/allcomments.component';
import { CustomvalidatorsDirective } from './customvalidators.directive';
/*import { OrderByDatePipe } from './pipes/date-sort.pipe';*/

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    MyAlbumsComponent,
    LoginComponent,
    CreateAlbumComponent,
    AlbumDetailsComponent,
    UploadPictureComponent,
    PhotoDetailsComponent,
    MyPhotoComponent,
    CommentComponent,
    AllcommentsComponent,
    CustomvalidatorsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule
    /*OrderByDatePipe*/
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

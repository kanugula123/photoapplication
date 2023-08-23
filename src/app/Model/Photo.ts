import { Comment } from "./Comment";

export class Photo {

  id: any;
  albumId: any;
  createdBy: any;
  dateCreated: any;
  photoUrl: any;
  comment!: Array<Comment>;
}

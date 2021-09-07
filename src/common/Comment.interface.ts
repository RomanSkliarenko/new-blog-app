export default interface IComment {
  _id?: string;
  commentedBy: string;
  followedCommentID?: string;
  postID: string;
  text: string;
  dateCreated?: string;
  likes: string[];
  __v?: number;
}

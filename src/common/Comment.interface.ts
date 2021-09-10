export default interface IComment {
  _id: string;
  commentedBy: string;
  followedCommentID: string | null;
  postID: string;
  text: string;
  dateCreated: string;
  likes: string[];
  __v: number;
}

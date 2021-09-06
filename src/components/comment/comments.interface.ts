export interface IComment {
  _id: string;
  commentedBy: string;
  followedCommentID: string;
  postID: string;
  text: string;
  dateCreated: string;
  likes: [string];
}
export interface Props {
  sigleComment: IComment;
  userId: string;
  getCurrentPostComments: () => void;
  authUser: boolean;
}

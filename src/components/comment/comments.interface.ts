import IComment from '../../common/Comment.interface';

export interface Props {
  sigleComment: IComment;
  userId?: string;
  getCurrentPostComments: () => void;
  authUser: boolean;
}

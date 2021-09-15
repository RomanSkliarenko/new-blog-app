export default interface IProps {
  editCommentInputFlag: boolean;
  setEditCommentInputFlag: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: string;
  getCurrentPostComments: () => void;
}

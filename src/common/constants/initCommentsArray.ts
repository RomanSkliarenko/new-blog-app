import IComment from '../Comment.interface';

const NO_COMMENTS_PLACEHOLDER: Array<IComment> = [
  {
    _id: '1',
    commentedBy: '1',
    dateCreated: '1',
    followedCommentID: null,
    likes: [],
    postID: '1',
    text: 'No comments yet',
    __v: 1,
  },
];

export default NO_COMMENTS_PLACEHOLDER;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import postsOperations from "../../redux/posts/post-operations";

export default function Comments() {
  const dispatch = useDispatch();
  const postComments = useSelector((state) => state.posts.selectedPostComments);
  const post = useSelector((state) => state.posts.selectedPost);
  const currentUserId = useSelector((state) => state.users.currentAuthUser._id);

  return (
    <>
      {postComments
        ? postComments.map((comment) => (
            <li key={comment._id}>
              {comment.text}
              <button
                type="button"
                className="like-button"
                onClick={() => {
                  dispatch(
                    postsOperations.setCommentLike(comment._id, post._id)
                  );
                }}
              >
                💔
              </button>
              {comment.likes.length}
              {comment.commentedBy === currentUserId ? (
                <button
                  type="button"
                  onClick={() => {
                    dispatch(
                      postsOperations.deleteCommentFromSelectedPost(
                        comment._id,
                        post._id
                      )
                    );
                  }}
                >
                  x
                </button>
              ) : null}
            </li>
          ))
        : null}
    </>
  );
}

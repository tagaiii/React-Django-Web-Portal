import React from "react";
import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { useAddCommentMutation } from "../../app/services/auth/authService";
import { useDeleteCommentMutation } from "../../app/services/auth/authService";
import { useLikeCommentMutation } from "../../app/services/auth/authService";

const CommentList = ({ articleId }) => {
  const [allComments, setAllComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = allComments
    .filter((comment) => comment.parent === null)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  const getReplies = (commentId) =>
    allComments
      .filter((comment) => comment.parent === commentId)
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
  const [addComment, resultAdd] = useAddCommentMutation();
  const [deleteComment, resultDelete] = useDeleteCommentMutation();
  const [likeComment, resultLike] = useLikeCommentMutation()

  useEffect(() => {
    const getAllComments = async () => {
      let response = await fetch(`/api/comments?article=${articleId}`);
      let data = await response.json();
      setAllComments(data);
    };
    getAllComments();
  }, [resultAdd.isSuccess, resultDelete.isSuccess, resultLike.isSuccess, articleId]);

  return (
    <div>
      <CommentForm articleId={articleId} addComment={addComment} setActiveComment={setActiveComment}/>
      {rootComments.map((comment) => (
        <Comment
          comment={comment}
          key={comment.id}
          getReplies={getReplies}
          activeComment={activeComment}
          setActiveComment={setActiveComment}
          deleteComment={deleteComment}
          addComment={addComment}
          likeComment={likeComment}
          articleId={articleId}
        />
      ))}
    </div>
  );
};

export default CommentList;

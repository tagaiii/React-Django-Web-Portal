import React from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  Group,
  Avatar,
  Text,
  Button,
  Container,
  Mark,
} from "@mantine/core";
import CommentForm from "./CommentForm";
import { ThumbUp, ThumbUpOff } from "tabler-icons-react";
import { useState } from "react";

const Comment = ({
  comment,
  getReplies,
  setActiveComment,
  activeComment,
  deleteComment,
  addComment,
  likeComment,
  articleId,
  parentComment = null,
}) => {
  const { userInfo } = useSelector((state) => state.auth);

  const [liked, setLiked] = useState(comment.likes.includes(userInfo?.id));
  const [likeCount, setLikeCount] = useState(comment.likes.length);
  const handleLikeDislike = async () => {
    let data = await likeComment(comment.id).unwrap();
    if (data.message === "Liked") {
      setLiked(true);
    } else {
      setLiked(false);
    }
    setLikeCount(data.likes_count);
  };

  const replies = getReplies(comment.id);
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const canReply = Boolean(userInfo?.id);

  const canDelete = userInfo?.id === comment.author;

  const createdAt = new Date(comment.created_at).toLocaleString("ru-Ru", {
    timeZone: "Asia/Bishkek",
    timeStyle: "short",
    dateStyle: "short",
  });

  return (
    <Container p={0} size="xl" className="mb-2">
      <Paper withBorder radius="md" px="lg" py="xl">
        <Group noWrap>
          <Avatar
            radius="xl"
            size={48}
            classNames={{
              placeholder: "bg-slate-100 text-black",
              root: "self-start",
            }}
          >
            {comment.author_info[0]}
            {comment.author_info.split(" ")[1][0]}
          </Avatar>
          <div>
            <Group spacing={"xs"} className="items-end mb-2">
              <Text size="sm" weight={700}>
                {comment.author_info}
              </Text>
              <Text size="xs" color="dimmed">
                {createdAt}
              </Text>
              {parentComment && (
                <Text size={"xs"}>
                  кому: <Mark>{parentComment.author_info}</Mark>
                </Text>
              )}
            </Group>
            <Text className="w-full">{comment.body}</Text>
            <Group spacing={"xs"} className="mt-3">
              {canReply && (
                <Button
                  className="hover:bg-slate-100 transition duration-200 color-white"
                  variant="subtle"
                  radius="xl"
                  type="submit"
                  size="xs"
                  color="dark"
                  onClick={() =>
                    setActiveComment({ id: comment.id, type: "replying" })
                  }
                >
                  Ответить
                </Button>
              )}
              {canDelete && (
                <Button
                  className="hover:bg-slate-100 transition duration-200"
                  variant="subtle"
                  radius="xl"
                  type="submit"
                  size="xs"
                  color="dark"
                  onClick={() => deleteComment(comment.id)}
                >
                  Удалить
                </Button>
              )}
              <Group>
                {liked ? (
                  <Button
                    className="hover:border-red-500 transition duration-200"
                    variant="subtle"
                    color={"red"}
                    radius="xl"
                    type="submit"
                    size="xs"
                    onClick={handleLikeDislike}
                    rightIcon={
                      <Text color={"black"}>
                        {likeCount > 0 ? likeCount : ""}
                      </Text>
                    }
                  >
                    <ThumbUpOff color="red" />
                  </Button>
                ) : (
                  <Button
                    className="hover:border-green-500 transition duration-200"
                    variant="subtle"
                    color={"green"}
                    radius="xl"
                    type="submit"
                    size="xs"
                    onClick={handleLikeDislike}
                    rightIcon={
                      <Text color={"black"}>{likeCount > 0 && likeCount}</Text>
                    }
                  >
                    <ThumbUp color="green" />
                  </Button>
                )}
              </Group>
              {isReplying && (
                <CommentForm
                  hasCancelButton
                  handleCancel={() => {
                    setActiveComment(null);
                  }}
                  addComment={addComment}
                  parentId={comment.id}
                  articleId={articleId}
                  setActiveComment={setActiveComment}
                />
              )}
            </Group>
          </div>
        </Group>
        {replies.length > 0 && (
          <Paper ml={48} mt={"md"}>
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                deleteComment={deleteComment}
                addComment={addComment}
                likeComment={likeComment}
                articleId={articleId}
                getReplies={getReplies}
                parentComment={comment}
              />
            ))}
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default Comment;

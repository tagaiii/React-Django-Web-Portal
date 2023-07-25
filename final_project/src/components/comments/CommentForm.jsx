import React from "react";
import { useForm } from "react-hook-form";
import { Button, Space, Group } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";

const CommentForm = ({
  hasCancelButton = false,
  handleCancel,
  articleId,
  parentId = null,
  addComment,
  setActiveComment
}) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { register, watch, handleSubmit, reset } = useForm();
  const [height, setHeight] = useState("5rem");

  

  const onSubmit = (data) => {
    data.article = articleId
    data.parent = parentId
    data.author = userInfo.id
    addComment(data)
    setActiveComment(null)
    reset()
  };
  const onError = (errors, e) => console.log(errors, e);
  const isButtonDisabled = watch("body", "").length === 0;

  const handleChange = (event) => {
    setHeight(
      event.target.value ? `${event.target.scrollHeight + 2}px` : "5rem"
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <textarea
          className="w-full outline-none resize-none max-h-72 p-2 my-2 border border-gray-300 focus:border-gray-700 focus:bg-slate-100 transition duration-200"
          style={{ height, minHeight: "5rem" }}
          placeholder="Что вы думаете?"
          {...register("body", {
            onChange: handleChange,
          })}
        />
        <input type="hidden" {...register("article")} />
        <input type="hidden" {...register("parent")} />
        <input type="hidden" {...register("author")} />
      </div>
      <Group>
        <Button
          className="hover:bg-slate-100 transition duration-200"
          variant="default"
          radius="sm"
          type="submit"
          size="xs"
          disabled={isButtonDisabled}
        >
          Оставить комментарий
        </Button>
        {hasCancelButton && (
          <Button
            className="hover:bg-slate-100 transition duration-200"
            variant="default"
            radius="sm"
            type="submit"
            size="xs"
            onClick={handleCancel}
          >
            Отменить
          </Button>
        )}
      </Group>
      <Space h={"md"} />
    </form>
  );
};

export default CommentForm;

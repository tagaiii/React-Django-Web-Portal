import React from "react";
import { useEffect } from "react";
import RichEditor from "./RichEditor";
import { useAddPostMutation } from "../../features/forum/forumApi";

const NewPost = ({ setShowMsg, threadId }) => {
  const [addPost, result] = useAddPostMutation();
  useEffect(() => {
    if (result.isSuccess) {
      setShowMsg(true);
    }
    const timer = setTimeout(() => {
      setShowMsg(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [result, setShowMsg]);

  return (
    <>
      <RichEditor onSubmit={addPost} threadId={threadId} hasTitle={false}/>
    </>
  );
};

export default NewPost;

import React from "react";
import { useEffect } from "react";
import RichEditor from "./RichEditor";
import { useCreateThreadMutation } from "../../features/forum/forumApi";

const NewThread = ({ setToggleEditor, setShowMsg }) => {
  const [createThread, result] = useCreateThreadMutation();

  useEffect(() => {
    if (result.isSuccess) {
      setShowMsg(true);
      setToggleEditor(false);
    }
    const timer = setTimeout(() => {
      setShowMsg(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [result, setShowMsg, setToggleEditor]);

  return (
    <>
      <RichEditor onSubmit={createThread} isNewThread={true}/>
    </>
  );
};

export default NewThread;

import "react-quill/dist/quill.snow.css";
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";
import { useState } from "react";
import { Paper, Button, TextInput } from "@mantine/core";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";

const RichEditor = ({
  onSubmit,
  isNewThread = false,
  threadId = null,
  hasTitle = true,
}) => {
  Quill.register("modules/imageResize", ImageResize);

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?.id;
  const [value, setValue] = useState(null);
  const [thread, setThread] = useState({
    author: userId,
    ...(isNewThread && { title: "" }),
    ...(threadId && { thread: threadId }),
    content: {},
    content_to_display: "",
  });

  const formats = [
    "size",
    "align",
    "image",
    "video",
    "resize",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code",
    "code-block",
    "font",
    "link",
    "color",
    "header",
    "indent",
    "list",
    "direction",
    "background",
  ];

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
    imageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
    syntax: true,
  };

  const handleContent = (content, delta, source, editor) => {
    let cleanHTML = DOMPurify.sanitize(editor.getHTML());
    setThread((thread) => ({
      ...thread,
      content: JSON.stringify(editor.getContents()),
    }));
    setThread((thread) => ({ ...thread, content_to_display: cleanHTML }));
    setValue(editor.getContents());
  };

  const handleChange = (e) => {
    setThread((thread) => ({ ...thread, title: e.target.value }));
  };

  const handleSubmit = () => {
    if (onSubmit(thread)) {
      setValue("");
    }
  };

  return (
    <>
      {hasTitle && (
        <TextInput
          placeholder="Введите заголовок..."
          label="Заголовок"
          withAsterisk
          onChange={handleChange}
        />
      )}
      <Paper className="bg-white editor-height" mt={"xs"}>
        <ReactQuill
          modules={modules}
          formats={formats}
          theme="snow"
          value={value}
          onChange={handleContent}
          placeholder="Содержание..."
        />
      </Paper>
      <Button
        className="hover:bg-slate-100 hover:border-black transition duration-200 border-gray-300"
        variant="subtle"
        type="submit"
        size="md"
        color="dark"
        onClick={handleSubmit}
      >
        Создать
      </Button>
    </>
  );
};

export default RichEditor;

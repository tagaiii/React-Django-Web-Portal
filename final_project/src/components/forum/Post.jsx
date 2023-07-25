import React from "react";
import { Container, Paper, Text, Group } from "@mantine/core";
import parse from "html-react-parser";
import { useState, useEffect } from "react";

const Post = ({ post }) => {
  const [htmlString, setHtmlString] = useState();
  const date = new Date(post?.created_at).toLocaleString("ru-Ru", {
    timeStyle: "short",
    dateStyle: "short",
    timeZone: "Asia/Bishkek",
  });
  useEffect(() => {
    if (post) {
      setHtmlString(parse(post.content_to_display));
    }
  }, [post]);
  return (
    <div>
      <Group
        className="bg-white"
        noWrap
        spacing={"xs"}
        position="apart"
        p={"xs"}
      >
        <Paper className="bg-transparent">
          <Text>
            {post?.author_info} • {date}
          </Text>
        </Paper>
      </Group>
      <hr className="border-black" />
      <Paper className="ql-snow">
        <Paper className="ql-editor" p={"xs"}>
          {htmlString}
        </Paper>
      </Paper>
    </div>
  );
};

export default Post;

import "react-quill/dist/quill.snow.css";
import React from "react";
import Post from "../components/forum/Post";
import NewPost from "../components/forum/NewPost";
import { useParams } from "react-router-dom";
import { useGetThreadByIdQuery } from "../features/forum/forumApi";
import { useGetPostsByThreadIdQuery } from "../features/forum/forumApi";
import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Text,
  Title,
  Group,
  Button,
  Affix,
  Notification,
} from "@mantine/core";
import { Check } from "tabler-icons-react";
import parse from "html-react-parser";

const Thread = () => {
  let { threadId } = useParams();
  const [thread, setThread] = useState();
  const [htmlString, setHtmlString] = useState();
  const [showMsg, setShowMsg] = useState();
  const { data, isFetching } = useGetThreadByIdQuery(Number(threadId));
  const date = new Date(thread?.created_at).toLocaleString("ru-Ru", {
    timeStyle: "short",
    dateStyle: "short",
    timeZone: "Asia/Bishkek",
  });
  useEffect(() => {
    if (data) {
      setThread(data);
      setHtmlString(parse(data.content_to_display));
    }
  }, [data]);
  const handleClick = () => {
    const element = document.getElementById("PostEditor");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [posts, setPosts] = useState([])
  const {data: postsData, refetch} = useGetPostsByThreadIdQuery(threadId)
  useEffect(() => {
    refetch()
    if (postsData) {
      setPosts(postsData)
    }
  }, [postsData, refetch, showMsg])
  return (
    <Container size={"lg"} p="xs">
      <Paper className="bg-slate-100 min-h-screen" p="xs">
        <Group
          className="bg-white"
          noWrap
          spacing={"xs"}
          position="apart"
          p={"xs"}
        >
          <Paper className="bg-transparent">
            <Title size={"2em"}>{thread?.title}</Title>
            <Text>
              {thread?.author_info} • {date}
            </Text>
          </Paper>
          <Button
            className="hover:bg-slate-100 bg-transparent transition duration-200 self-start"
            variant="subtle"
            radius="xl"
            type="submit"
            size="md"
            color="dark"
            onClick={handleClick}
          >
            Ответить
          </Button>
        </Group>
        <Paper className="ql-snow min-h-fit" mt="xs">
          <div className="ql-editor">{htmlString}</div>
        </Paper>
        <Paper className="min-h-fit" mt="xs" p="xs">
          <Title>Все ответы</Title>
          {posts.map((post) => (
            <Post post={post} />
          ))}
        </Paper>
        <Paper className="flex flex-col" mt="xs" p="xs" id="PostEditor">
          <NewPost setShowMsg={setShowMsg} threadId={threadId} />
        </Paper>
      </Paper>
      {showMsg && (
        <Affix position={{ bottom: "15px", right: "15px" }}>
          <Notification
            icon={<Check size={"1.1rem"} />}
            color="teal"
            title="Ответ успешно создан!"
            onClose={() => {
              setShowMsg(false);
            }}
          />
        </Affix>
      )}
    </Container>
  );
};

export default Thread;

import React from "react";
import { Paper, Text, Group, Avatar } from "@mantine/core";
import {
  MessageCircle2,
  ArrowNarrowDown,
  ArrowNarrowUp,
} from "tabler-icons-react";

const ThreadCard = ({ thread }) => {
  const date = new Date(thread.created_at).toLocaleString("ru-Ru", {
    timeStyle: "short",
    dateStyle: "short",
    timeZone: "Asia/Bishkek",
  });
  return (
    <Paper p={"sm"} className="border hover:border-black" mt={"xs"}>
      <Group noWrap>
        <Avatar
          radius="xl"
          size={48}
          classNames={{
            placeholder: "bg-slate-100 text-black",
          }}
        >
          {thread.author_info[0]}
          {thread.author_info.split(" ")[1][0]}
        </Avatar>
        <div>
          <Group className="items-end">
            <Text weight={700}>{thread.title}</Text>
            <Text size="xs" c={"dimmed"}>
              {date}
            </Text>
          </Group>
          <Group mt={"sm"}>
            <Text size={"sm"}>{thread.author_info}</Text>
            <Group
              spacing={"none"}
              className="bg-slate-100 rounded-xl px-2 py-0.5"
            >
              <MessageCircle2 size={"20px"} />
              <Text size={"sm"} ml="4px">
                {thread.posts_count}
              </Text>
            </Group>
            <Group
              spacing={"none"}
              className="bg-slate-100 rounded-xl px-2 py-0.5"
            >
              <ArrowNarrowUp color="green" size={"20px"} />
              <Text size={"sm"} ml="4px" color={"green"}>
                {thread.likes}
              </Text>
            </Group>
            <Group
              spacing={"none"}
              className="bg-slate-100 rounded-xl px-2 py-0.5"
            >
              <ArrowNarrowDown color="red" size={"20px"} />
              <Text size={"sm"} ml="4px">
                {thread.dislikes}
              </Text>
            </Group>
          </Group>
        </div>
      </Group>
    </Paper>
  );
};

export default ThreadCard;

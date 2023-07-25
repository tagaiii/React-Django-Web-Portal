import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Autocomplete,
  Flex,
  Button,
  Notification,
  Affix
} from "@mantine/core";
import { Link } from "react-router-dom";
import { AutoCompleteItem } from "../components/AutocompleteItem";
import { Search } from "tabler-icons-react";
import ThreadCard from "../components/forum/ThreadCard";
import { useGetThreadsQuery } from "../features/forum/forumApi";
import { useSearchThreadsQuery } from "../features/forum/forumApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import NewThread from "../components/forum/NewThread";
import { Check } from "tabler-icons-react";

const Forum = () => {
  const [threads, setThreads] = useState([]);
  const [value, setValue] = useState("");
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [nothingFound, setNothingFound] = useState(null);
  const [toggleEditor, setToggleEditor] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const { data, isFetching, refetch } = useGetThreadsQuery();
  useEffect(() => {
    refetch()
    if (data) {
      setThreads(data);
    }
  }, [data, toggleEditor, refetch]);


  const { data: searchData, isSuccess: isSearchSuccess } =
    useSearchThreadsQuery(value.trim().length !== 0 ? value : skipToken);
  useEffect(() => {
    if (isSearchSuccess) {
      setAutocompleteData(
        searchData.map((item) => ({
          ...item,
          value: item.title,
        }))
      );
    } else if (value.trim().length > 0) {
      setNothingFound("Ничего не найдено");
    } else {
      setAutocompleteData([]);
      setNothingFound(null);
    }
  }, [isSearchSuccess, searchData, value]);

  return (
    <Container size={"lg"} p="xs">
      <Paper className="bg-slate-100 min-h-screen" p={"xs"}>
        <Flex justify={"space-between"}>
          <div>Рейтинг тем</div>
          <div style={{ width: "75%" }} className="flex flex-col">
            <Autocomplete
              classNames={{ input: "focus:border-black" }}
              value={value}
              onChange={setValue}
              itemComponent={AutoCompleteItem}
              icon={<Search size={18} color="black" />}
              data={autocompleteData}
              nothingFound={nothingFound}
            />
            <Button
              className="hover:bg-white bg-transparent transition duration-200 self-end"
              variant="subtle"
              radius="xl"
              type="submit"
              size="md"
              color="dark"
              mt={"xs"}
              onClick={() => {
                setToggleEditor((toggle) => !toggle);
              }}
            >
              {!toggleEditor ? "Создать тему" : "Отменить"}
            </Button>
            {toggleEditor && (
              <NewThread
                setToggleEditor={setToggleEditor}
                setShowMsg={setShowMsg}
              />
            )}
            <Paper className="bg-transparent">
              {threads.map((thread) => (
                <Link to={`/forum/threads/${thread.id}`} key={thread.id}>
                  <ThreadCard thread={thread} />
                </Link>
              ))}
            </Paper>
          </div>
        </Flex>
      </Paper>
      {showMsg && (
        <Affix position={{ bottom: "15px", right: "15px" }}>
          <Notification
            icon={<Check size={"1.1rem"} />}
            color="teal"
            title="Тема успешно создана!"
            onClose={() => {
              setShowMsg(false);
            }}
          />
        </Affix>
      )}
    </Container>
  );
};

export default Forum;

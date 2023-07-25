import React from "react";
import {
  Container,
  Paper,
  Space,
  Group,
  Flex,
  Title,
  Autocomplete,
} from "@mantine/core";
import { Search, News } from "tabler-icons-react";
import NewsFeedCard from "./NewsFeedCard";
import { useState, useEffect } from "react";
import { AutoCompleteItem } from "../AutocompleteItem.jsx";

function NewsFeed() {
  const [value, setValue] = useState("");
  const [sortType, setSortType] = useState("");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [nothingFound, setNothingFound] = useState(false);

  useEffect(() => {
    const getArticles = async () => {
      let response = await fetch("/api/articles");
      let data = await response.json();
      setData(data);
      setSortType("recommended");
    };
    getArticles();
  }, []);

  useEffect(() => {
    const getSearchResults = async () => {
      let response = await fetch(`/api/articles?search=${value}`);
      let data = await response.json();
      const autocompleteData = data.map((item) => ({
        ...item,
        value: item.header,
      }));
      setSearchData(autocompleteData);
    };
    if (value.trim().length !== 0) {
      setNothingFound("Ничего не найдено!");
      getSearchResults();
    } else if (value.trim().length === 0) {
      setSearchData([]);
    }
  }, [value]);

  return (
    <Container size={"lg"} p="xs">
      <Title color={"white"} align="center">
        Все новости
      </Title>
      <hr />
      <Space h={"md"} />
      <Flex direction={"column"} className={"min-h-screen bg-slate-100"} p="xs">
        <Flex direction={{ base: "column", xs: "row" }} gap="xs">
          <div style={{ width: "32%" }}>
            <Paper px="xs" pt="xs">
              <Group spacing={"xs"}>
                <News />
                <Title order={3}>Поиск новостей</Title>
              </Group>
              <Space h="xs" />
              <Autocomplete
                classNames={{ input: "focus:border-black" }}
                value={value}
                onChange={setValue}
                itemComponent={AutoCompleteItem}
                icon={<Search size={18} color="black" />}
                data={searchData}
                placeholder="Что вы хотите найти?"
                nothingFound={nothingFound}
                dropdownPosition="bottom"
              />
              <Space h={"xs"} />
            </Paper>
          </div>
          <div style={{ width: "68%" }}>
            {data.length > 0 ? (
              data.map((article, index) => (
                <div key={index}>
                  <NewsFeedCard article={article} />
                  <Space h={"xs"} />
                </div>
              ))
            ) : (
              <Title>Ничего не найдено</Title>
            )}
          </div>
        </Flex>
      </Flex>
    </Container>
  );
}

export default NewsFeed;

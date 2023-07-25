import React from "react";
import {
  Container,
  Space,
  Flex,
  Title,
} from "@mantine/core";
import NewsFeedCard from "../components/articles/NewsFeedCard";
import { useState, useEffect } from "react";

function AnnouncementPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      let response = await fetch("/api/articles?tags__title=announcement");
      let data = await response.json();
      setData(data);
    };
    getArticles();
  }, []);

  return (
    <Container size={"lg"} p="xs">
      <Title color={"white"} align="center">
        Объявления факультета
      </Title>
      <hr />
      <Space h={"md"} />
      <Flex direction={"column"} className={"min-h-screen bg-slate-100"} p="xs">
        <Flex direction={{ base: "column", xs: "row" }} gap="xs">
          <div style={{ width: "18%" }}>
          </div>
          <div style={{ width: "82%" }}>
            {data.length > 0 && (
              data.map((article, index) => (
                <div key={index}>
                  <NewsFeedCard article={article} />
                  <Space h={"xs"} />
                </div>
              ))
            )}
          </div>
        </Flex>
      </Flex>
    </Container>
  );
}

export default AnnouncementPage;

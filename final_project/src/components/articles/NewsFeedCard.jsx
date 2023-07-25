import React from "react";
import { Image, Paper, Title, Flex, Text } from "@mantine/core";
import { Link } from "react-router-dom";

function NewsFeedCard({ article }) {
  let date = new Date(article.created_at).toLocaleDateString()

  return (
    <Link to={`/articles/${article.id}`}>
      <Paper p={"sm"}>
        <Flex gap={"sm"} wrap="wrap" direction={"column"}>
          <Flex direction={"column"} rowGap={"md"}>
            <Title>{article.header}</Title>
            <Text>
              {article.body.length > 30 ? article.body.slice(0, 30) + '...' : article.body}
            </Text>
          </Flex>
          <div>
            <Image height={300} src={article.image} />
          </div>
          <Text color={"dimmed"}>{date}</Text>
        </Flex>
      </Paper>
    </Link>
  );
}

export default NewsFeedCard;

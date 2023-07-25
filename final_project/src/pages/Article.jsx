import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  createStyles,
  Container,
  Title,
  Text,
  Paper,
  Space,
  Flex,
  Divider,
  Group,
  Button,
} from "@mantine/core";
import RelatedArticleCard from "../components/articles/RelatedArticleCard";
import CommentList from "../components/comments/CommentList";
import { ThumbUp, ThumbUpOff } from "tabler-icons-react";

function ArticlePage() {
  let { articleId } = useParams();
  const { userToken, userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?.id;
  const [article, setArticle] = useState();
  const [articleTag, setArticleTag] = useState("");
  const [relatedArticles, setRelatedArticles] = useState();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLikeDislike = async () => {
    let response = await fetch(`/api/articles/${Number(articleId)}/like`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    let data = await response.json();
    if (data.message === "Liked") {
      setLiked(true);
    } else {
      setLiked(false);
    }
    setLikeCount(data.likes_count);
  };

  useEffect(() => {
    const getData = async () => {
      let articleResponse = await fetch(`/api/articles/${Number(articleId)}`);
      let articleData = await articleResponse.json();
      setArticle(articleData);
      setLiked(articleData.likes.includes(userId));
      setLikeCount(articleData.likes.length);
      setArticleTag(articleData?.tags[0]?.title);

      if (articleTag) {
        let relatedArticleResponse = await fetch(
          `/api/articles?tags__title=${articleTag}`
        );
        let relatedArticleData = await relatedArticleResponse.json();
        setRelatedArticles(relatedArticleData.filter((article) => article.id !== Number(articleId)));
      }
    };
    getData();
  }, [articleId, articleTag, userId]);

  const useStyles = createStyles((theme) => ({
    headerImg: {
      height: 400,
      backgroundImage: `url(${article?.image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",

      [theme.fn.smallerThan("sm")]: {
        height: 200,
      },
    },
    container: {
      display: "flex",
      flexDirection: "column",
      zIndex: 1,

      [theme.fn.smallerThan("sm")]: {
        paddingBottom: theme.spacing.xl * 3,
      },
    },

    title: {
      color: theme.black,
      fontSize: 32,
      lineHeight: 1.1,
      marginTop: theme.spacing.xs,

      [theme.fn.smallerThan("sm")]: {
        fontSize: 25,
        lineHeight: 1.2,
      },

      [theme.fn.smallerThan("xs")]: {
        fontSize: 16,
        lineHeight: 1.3,
      },
    },

    description: {
      maxWidth: "100%",

      [theme.fn.smallerThan("sm")]: {
        fontSize: theme.fontSizes.sm,
      },
    },
  }));
  const { classes } = useStyles();

  const lines = article?.body.split("\r\n");
  const date = new Date(article?.created_at).toLocaleDateString();

  return (
    <div>
      <Container className={classes.container} p={"xs"} size="lg">
        <Flex
          className="bg-slate-100"
          p={"xs"}
          gap={"xs"}
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "unset" }}
        >
          <div style={{ width: "75%" }}>
            <Paper p="xs" radius={"xs"}>
              <div className={classes.headerImg}></div>
              <Title className={classes.title}>{article?.header}</Title>
              <Text color="dimmed" transform="uppercase" weight={700} mt={5}>
                {date}
              </Text>
              <Divider mb={"sm"} />
              <Text className={classes.description} size="xl" mt="xl">
                {lines?.map((line, index) => (
                  <div key={index}>
                    <p className="text-base">{line}</p>
                    <Space h="xs" />
                  </div>
                ))}
              </Text>
              <Space h={"sm"} />
              <Group>
                {liked ? (
                  <Button
                    className="hover:border-red-500 transition duration-200"
                    classNames={{rightIcon: "ml-2"}}
                    variant="subtle"
                    color={"red"}
                    radius="xl"
                    type="submit"
                    size="xs"
                    onClick={handleLikeDislike}
                    rightIcon={<Text size={"sm"} color={'black'}>{likeCount}</Text>}
                  >
                    <ThumbUpOff color="red" />
                  </Button>
                ) : (
                  <Button
                    className="hover:border-green-500 transition duration-200"
                    classNames={{rightIcon: "ml-2"}}
                    variant="subtle"
                    color={"green"}
                    radius="xl"
                    type="submit"
                    size="xs"
                    onClick={handleLikeDislike}
                    rightIcon={<Text size={"sm"} color={'black'}>{likeCount}</Text>}
                  >
                    <ThumbUp color="green" />
                  </Button>
                )}
              </Group>
            </Paper>
            <Space h="xs" />
            <Paper p="xs">
              <Title>Все комментарии</Title>
              <CommentList articleId={articleId} />
            </Paper>
          </div>
          <div style={{ width: "24%" }}>
            <Flex wrap={"wrap"} gap={5}>
              {relatedArticles?.map((article, index) => (
                <RelatedArticleCard key={index} article={article} />
              ))}
            </Flex>
          </div>
        </Flex>
      </Container>
    </div>
  );
}

export default ArticlePage;
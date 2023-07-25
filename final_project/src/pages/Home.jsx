import "../App.css";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Container, Grid, Title, Space } from "@mantine/core";
import Carousel from "../components/articles/Carousel";
import Card from "../components/articles/Card";

function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getArticlesForMainPage = async () => {
      let response = await fetch("/api/articles?for_main_page=true");
      let data = await response.json();
      setData(data.slice(-5));
    };
    getArticlesForMainPage();
  }, []);

  return (
    <div>
      <Container size={"lg"} p="xs">
        <Title color={"white"}>
          Главные новости
        </Title>
        <hr />
        <Space h={"sm"} />
        <div className="center-items">
          <div style={{ width: "100%" }}>
            <Grid columns={5} gutter="xs">
              <Grid.Col span={3}>
                <Carousel data={data.slice(0, 3)} />
              </Grid.Col>
              <Grid.Col span={2}>
                <Grid gutter="xs">
                  {data.slice(3).map((article, index) => (
                    <Grid.Col key={index}>
                      <Card hover={true} article={article} />
                    </Grid.Col>
                  ))}
                </Grid>
              </Grid.Col>
            </Grid>
          </div>
        </div>
      </Container>
      <Outlet />
    </div>
  );
}

export default HomePage;

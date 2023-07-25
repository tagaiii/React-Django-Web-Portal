import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../app/services/auth/authService";
import { setCredentials } from "../features/auth/authSlice";
import { logout } from "../features/auth/authActions";
import { ChevronDown } from "tabler-icons-react";
import {
  createStyles,
  Menu,
  Header,
  Container,
  Group,
  Button,
  Burger,
  Drawer,
} from "@mantine/core";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import logo from "../assets/media/logo.png"

const HEADER_HEIGHT = 100;

const useStyles = createStyles((theme) => ({
  outer: {
    backgroundImage: theme.fn.linearGradient(90, "#2c82e9", "#ee2c5d"),
  },

  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
    background: "transparent !important",
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.xs,
    textDecoration: "none",
    color: "white",
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    transition: "ease-in",
    animationDuration: "0.3s",

    "&:hover": {},
    [theme.fn.smallerThan("md")]: {
      color: "black",
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderActionProps {
  links: {
    link: string,
    label: string,
    links: { link: string, label: string }[],
  }[];
}

export function HeaderAction({ links }: HeaderActionProps) {

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 180000,
  });
  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  const { classes } = useStyles();
  const [opened, setOpened] = useState();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>
        <Link to={item.link} className={"block"}>
          {item.label}
        </Link>
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          position="bottom-start"
          key={link.label}
          trigger="hover"
          exitTransitionDuration={0}
        >
          <Menu.Target>
            <Button
              className={`${classes.link} bg-transparent hover:bg-slate-100 hover:text-black ease-in duration-100`}
            >
              <Group spacing={"3px"}>
                <span className={classes.linkLabel}>{link.label}</span>
                <ChevronDown
                  size={12}
                  strokeWidth={2}
                  className="color-white hover:bg-slate-100 hover:color-black ease-in duration-50"
                />
              </Group>
            </Button>
          </Menu.Target>
          <Menu.Dropdown className="bg-slate-100">{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        to={link.link}
        className={`${classes.link} hover:bg-slate-100 hover:text-black ease-in duration-100`}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
      <Container className={classes.outer} fluid>
        <Container className={classes.inner} size={"lg"} px="xs">
          <Group>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              className={classes.burger}
              size="md"
              color="white"
            />
            <a href="/">
              <img
                src={logo}
                alt=""
                width={80}
              />
            </a>
          </Group>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            title="Навигация по сайту"
            padding="lg"
            size="lg"
          >
            {items}
          </Drawer>
          {isFetching ? (
            <div></div>
          ) : userInfo ? (
            <Menu
              position="bottom-start"
              trigger="hover"
              exitTransitionDuration={0}
            >
              <Menu.Target>
                <Button
                  className={`${classes.link} bg-transparent hover:bg-slate-100 hover:text-black ease-in duration-100`}
                >
                  {userInfo.email}
                </Button>
              </Menu.Target>
              <Menu.Dropdown className="bg-slate-100">
                <Menu.Item className="w-52">
                  <span onClick={() => dispatch(logout())}>Выйти</span>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Group spacing={"xs"}>
              <Link to={"/login"}>
                <Button
                  className="hover:bg-transparent hover:text-white ease-in duration-100"
                  radius="sm"
                  sx={{ height: 30 }}
                  variant="default"
                >
                  Войти
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button
                  className="hover:bg-transparent hover:text-white ease-in duration-100"
                  radius="sm"
                  sx={{ height: 30 }}
                  variant="default"
                >
                  Регистрация
                </Button>
              </Link>
            </Group>
          )}
        </Container>
      </Container>
    </Header>
  );
}

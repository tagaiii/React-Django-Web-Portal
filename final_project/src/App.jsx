import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import HomePage from "./pages/Home";
import ForumPage from "./pages/Forum";
import Footer from "./components/Footer";
import ArticlePage from "./pages/Article";
import ThreadPage from "./pages/Thread";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import YouthCommitteePage from "./pages/YouthCommitteePage";
import AnnouncementPage from "./pages/AnnouncementPage";
import NewsFeed from "./components/articles/NewsFeed";
import ScrollToTop from "./utils/ScrollToTop";
import ProtectedRoute from "./utils/ProtectedRoute";
import { HeaderAction } from "./components/Nav";
import ContactPage from "./pages/ContactPage";

const links = [
  {
    link: "/  ",
    label: "Главная",
  },
  {
    link: "#1",
    label: "Новости факультета",
    links: [
      {
        link: "/announcements",
        label: "Объявления",
      },
      {
        link: "/youth-committee",
        label: "Студенческий совет",
      },
    ],
  },
  {
    link: "/forum",
    label: "Форум",
  },
  {
    link: "#2",
    label: "Обратная связь",
    links: [
      {
        link: "/faq",
        label: "Часто задаваемые вопросы",
      },
      {
        link: "/contact",
        label: "Контакты",
      },
    ],
  },
];

function App() {
  return (
    <MantineProvider
      theme={{
        headings: { fontFamily: "Montserrat, sans-serif", fontWeight: 400 },
      }}
    >
      <div className="rgb">
        <Router>
          <ScrollToTop>
            <HeaderAction links={links} />
            <Routes>
              <Route path="/" element={<HomePage />}>
                <Route index element={<NewsFeed />} />
              </Route>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/announcements" element={<AnnouncementPage />} />
              <Route path="/youth-committee" element={<YouthCommitteePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route path="/articles/:articleId" element={<ArticlePage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/forum/threads/:threadId" element={<ThreadPage />} />
            </Routes>
          </ScrollToTop>
        </Router>
      </div>
      <Footer />
    </MantineProvider>
  );
}

export default App;

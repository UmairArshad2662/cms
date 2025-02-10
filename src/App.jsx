import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Auth/signup";
import LoginPage from "./pages/Auth/signin";
import VideoPage from "./pages/Videopage/videopage";
import MainLayout from "./layout/Mainlayout";
import Page from "./pages/Videopage/page";

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<LoginPage />} />

      <Route element={<MainLayout />}>
      <Route path="/" element={<Page />} />

        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/" element={<Page />} />

      </Route>
    </Routes>
  );
};

export default App;

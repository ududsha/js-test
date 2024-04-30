import React from "react";
import { Route, Routes } from "react-router";

import Login from "./pages/Login";
import Layout from "./pages/Layout";

import Game from "./components/Game";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/games" element={<Home />} />
        <Route path="/game/:parameter" element={<Game />} />
      </Route>
    </Routes>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
//react router
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

//local imports
import Login from "./components/Login.jsx";
import Task from "./components/Task.jsx";
import Comments from "./components/Comments.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/task",
    element: <Task />,
  },
  {
    path: "/comments",
    element: <Comments />,
  },
  {
    path: "/comments/:category/:id",
    element: <Comment />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="376841111409-soab0kgmvs4f1rs12vk4aiaq8rukjjnf.apps.googleusercontent.com">
    <React.StrictMode>
      <RouterProvider router={router} />

      {/* <App /> */}
    </React.StrictMode>
  </GoogleOAuthProvider>
);

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
  <GoogleOAuthProvider
    clientId="635644996670-8fv86co48b1aaqqckv2qf6ocs5dfrduk.apps.googleusercontent.com"
    onAuthSuccess={(data) => console.log("Auth Success:", data)}
    onAuthFailure={(error) => console.log("Auth Failure:", error)}
  >
    <React.StrictMode>
      <RouterProvider router={router} />

      {/* <App /> */}
    </React.StrictMode>
  </GoogleOAuthProvider>
);

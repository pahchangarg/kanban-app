import { AddTask } from "./AddTask";
import Nav from "./Nav";
import TaskContainer from "./TaskContainer";
import Comments from "./Comments";
import { useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { useState } from "react";

const clientId =
  "635644996670-8fv86co48b1aaqqckv2qf6ocs5dfrduk.apps.googleusercontent.com";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5001/");

const Task = () => {
  const initialTasks = {
    pending: { items: [] },
    ongoing: { items: [] },
    completed: { items: [] },
  };

  const navigate = useNavigate();

  // Sample logout function
  const handleLogoutSuccess = (response) => {
    console.log("Logout Success:", response);
    // Handle any other logout tasks like clearing sessions, etc.
    navigate("/"); // Redirect to the login page after logout
  };
  const [tasks, setTasks] = useState({
    pending: { items: [] },
    ongoing: { items: [] },
    completed: { items: [] },
  });

  const handleTaskAdd = (newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      pending: {
        ...prevTasks.pending,
        items: [...prevTasks.pending.items, newTask],
      },
    }));
  };

  return (
    <>
      <Nav />
      <AddTask socket={socket} onTaskAdd={handleTaskAdd} />
      <TaskContainer socket={socket}> </TaskContainer>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={handleLogoutSuccess}
        onFailure={(error) => console.log("Logout Failure:", error)}
      />
    </>
  );
};

export default Task;

import { AddTask } from "./AddTask";
import Nav from "./Nav";
import TaskContainer from "./TestContainer";

import io from "socket.io-client";

const socket = io.connect("http://localhost:5001/");

const Task = () => {
  return (
    <>
      <Nav />
      <AddTask socket={socket} />
      <TaskContainer socket={socket} />
    </>
  );
};

export default Task;

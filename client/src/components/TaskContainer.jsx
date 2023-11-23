import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskContainer = (props, { socket }) => {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch("http://localhost:5001/api");
        const json = await data.json();
        setTasks(json);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  function handleDragEnd() {
    return;
  }

  return (
    <div className="container">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(tasks).map((task) => (
          <div className="pending__wrapper">
            <div className="pending__items">
              <p>Debug</p>
              <p className="comment">
                <Link to="/comments">2 comments</Link>
              </p>
              {props.children}
            </div>
          </div>
        ))}
        <div className="ongoing__wrapper">
          <div className="ongoing__items">
            <p>Ongoing</p>
            <p className="comment">
              <Link to="/comments">2 comments</Link>
            </p>
            {props.children}
          </div>
        </div>
        <div className="completed__wrapper">
          <div className="completed__items">
            <p>Completed</p>
            <p className="comment">
              <Link to="/comments">2 comments</Link>
            </p>
            {props.children}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskContainer;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskContainer = () => {
  const [tasks, setTasks] = useState({
    pending: { items: [] },
    ongoing: { items: [] },
    completed: { items: [] },
  });

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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceItems = tasks[source.droppableId].items;
    const [movedTask] = sourceItems.splice(source.index, 1);
    const updatedTasks = {
      ...tasks,
      [source.droppableId]: {
        ...tasks[source.droppableId],
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...tasks[destination.droppableId],
        items: [
          ...tasks[destination.droppableId].items.slice(0, destination.index),
          movedTask,
          ...tasks[destination.droppableId].items.slice(destination.index),
        ],
      },
    };
    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="container">
        {Object.entries(tasks).map(([stage, { items }]) => (
          <Droppable droppableId={stage} key={stage}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div className={`${stage}__wrapper`}>
                  <p>{stage.charAt(0).toUpperCase() + stage.slice(1)}</p>
                  <div className={`${stage}__items`}>
                    {items.map((task, index) => (
                      <Draggable
                        draggableId={task.id}
                        index={index}
                        key={task.id}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style, // Important to spread the existing styles
                              marginBottom: "10px",
                              padding: "10px",
                              border: "1px solid gray",
                              background: snapshot.isDragging
                                ? "lightgray"
                                : "", // Highlight the dragged item
                            }}
                          >
                            <p>
                              {task.title}
                              <br />
                              <Link
                                style={{
                                  marginTop: "10px",
                                  padding: "10px",
                                }}
                                to="/comments"
                              >
                                2 comments
                              </Link>
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskContainer;

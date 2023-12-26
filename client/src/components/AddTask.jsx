import { useRef } from "react";

export const AddTask = ({ onTaskAdd }) => {
  const taskRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    const taskTitle = taskRef.current.value;

    // Send the task to the server
    fetch("http://localhost:5001/api/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stage: "pending", title: taskTitle }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
        onTaskAdd(data.task); // <-- Make sure onTaskAdd is available here
        taskRef.current.value = "";
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  }

  return (
    <form className="form__input" onSubmit={handleSubmit}>
      <label htmlFor="task">Add Task</label>
      <input
        type="text"
        name="task"
        id="task"
        className="input"
        required
        ref={taskRef}
      />
      <button className="addTodoBtn">ADD TASK</button>
    </form>
  );
};

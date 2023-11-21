import { useRef } from "react";

export const AddTask = () => {
  const taskRef = useRef();
  function handleSubmit(event) {
    event.preventDefault();
    console.log(taskRef.current.value);
    taskRef.current.value = "";
  }
  return (
    <form className="form__input onSubmit={handleSubmit}">
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

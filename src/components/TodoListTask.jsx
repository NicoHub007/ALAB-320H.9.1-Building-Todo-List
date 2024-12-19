import { useState } from "react";
import ActionButton from "./ActionButton";
import CheckboxInput from "./CheckboxInput";
import TextInput from "./TextInput";

function TodoListTask({ task, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (editedTitle.trim()) {
      dispatch({ type: "edit_todo", payload: { id: task.id, title: editedTitle } });
      setIsEditing(false);
    } else {
      alert("Title cannot be empty");
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title); // Reset title to original
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch({ type: "remove_todo", payload: { id: task.id } });
    }
  };
  return (
    <div style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <CheckboxInput
          state={task.completed}
          setState={() => dispatch({ type: "toggle_todo", payload: { id: task.id } })}
          disabled={isEditing} // Disable checkbox while editing
        />
        {isEditing ? (
          <TextInput state={editedTitle} setState={setEditedTitle} />
        ) : (
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <ActionButton 
              type={'edit_todo'}
              payload={{title: task.title}}
               dispatch={() => setIsEditing(true)}
              >
                Edit
              </ActionButton>
            <ActionButton
              type= "remove_todo"
                payload= { { title: task.title }}
              dispatch={ dispatch }
              disabled={!task.completed}
            >
              Delete
            </ActionButton>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoListTask;

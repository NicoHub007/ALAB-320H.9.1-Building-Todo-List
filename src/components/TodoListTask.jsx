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
      setIsEditing(false); // Exit edit mode
    } else {
      alert("Title cannot be empty.");
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title); // Reset the edited title
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <CheckboxInput
          state={task.completed}
          setState={() => dispatch({ type: "toggle_todo", payload: { id: task.id } })}
          disabled={isEditing}
        />
        {isEditing ? (
          <TextInput state={editedTitle} setState={setEditedTitle} />
        ) : (
          <span>{task.title}</span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {isEditing ? (
          <>
            <ActionButton onClick={handleSave} disabled={!editedTitle.trim()}>
              Save
            </ActionButton>
            <ActionButton onClick={handleCancel}>Cancel</ActionButton>
          </>
        ) : (
          <>
            <ActionButton onClick={() => setIsEditing(true)}>Edit</ActionButton>
            <ActionButton
              onClick={() => dispatch({ type: "remove_todo", payload: { id: task.id } })}
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

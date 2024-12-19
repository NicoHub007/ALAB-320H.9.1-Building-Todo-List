export default function todoReducer(state, { type, payload }) {
    switch (type) {
        case "add_todo": {
            const { title, completed } = payload;
            if (title.trim() === "") {
                return state;
            }

            const hasThisTodo = state.some(todo => todo.title === title);
            if (hasThisTodo) {
                alert(`Todo "${title}" already exists. Please choose a unique title.`);
                return state;
            }

            const newId = state.length + 1;
            return [
                { userId: 1, id: newId, title: title, completed: completed || false },
                ...state,
            ];
        }

        case "remove_todo": {
            return state.filter(todo => todo.id !== payload.id);
        }

        case "toggle_todo": {
            return state.map(todo =>
                todo.id === payload.id ? { ...todo, completed: !todo.completed } : todo
            );
        }

        case "edit_todo": {
            return state.map(todo =>
                todo.id === payload.id
                    ? { ...todo, title: payload.title }
                    : todo
            );
        }

        default: {
            throw new Error("Unknown action type: " + type);
        }
    }
}

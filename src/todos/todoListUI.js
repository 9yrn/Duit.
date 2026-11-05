export function displayTodoListUI(todos, onEditTodo, onToggleTodo) {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-list");

    todos.forEach((todo) => {
        const todoElement = document.createElement("article");
        todoElement.classList.add("todoElement");
        if (todo.completed) {
            todoElement.classList.add("is-completed");
        }

        // Circular toggle button matching Apple Reminders
        const checkButton = document.createElement("button");
        checkButton.type = "button";
        checkButton.className = "todo-check";
        checkButton.setAttribute("role", "checkbox");
        checkButton.setAttribute("aria-checked", Boolean(todo.completed).toString());
        checkButton.setAttribute("aria-label", `Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`);

        checkButton.addEventListener("click", () => {
            if (onToggleTodo) {
                onToggleTodo(todo);
            }
        });

        const contentWrapper = document.createElement("div");
        contentWrapper.className = "todo-content";

        const title = document.createElement("h3");
        title.className = "todo-title";
        title.textContent = todo.title;

        contentWrapper.appendChild(title);

        if (todo.text && todo.text.trim().length > 0) {
            const content = document.createElement("p");
            content.className = "todo-notes";
            content.textContent = todo.text;
            contentWrapper.appendChild(content);
        }

        if (todo.date) {
            const date = document.createElement("span");
            date.className = "todo-date";
            date.textContent = todo.date;
            contentWrapper.appendChild(date);
        }

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "btn-secondary btn-edit";
        editButton.textContent = "Edit";
        editButton.setAttribute("aria-label", `Edit "${todo.title}"`);

        editButton.addEventListener("click", () => {
            if (onEditTodo) {
                onEditTodo(todo);
            }
        });

        todoElement.appendChild(checkButton);
        todoElement.appendChild(contentWrapper);
        todoElement.appendChild(editButton);

        todoContainer.appendChild(todoElement);
    });

    return todoContainer;
}

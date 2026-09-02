export function displayTodoListUI(todos, onEditTodo) {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-list");

    todos.forEach((todo) => {

        const todoElement = document.createElement("div")
        todoElement.classList.add("todoElement");

        const editButton = document.createElement("button");
        editButton.textContent = "edit";
        
        const title = document.createElement("h3");
        title.textContent = todo.title;

        const content = document.createElement("p");
        content.textContent = todo.text;

        const date = document.createElement("p");
        date.textContent = todo.date;

        todoElement.appendChild(title);
        todoElement.appendChild(content);
        todoElement.appendChild(date);
        todoElement.appendChild(editButton);

        editButton.addEventListener("click", () => {
            onEditTodo(todo);
        })

        todoContainer.appendChild(todoElement);

    });

    return todoContainer;


}

    

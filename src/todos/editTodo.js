export function editTodoUI(todo, projects, onTodoUpdated, onTodoDeleted, onCancel) {
    const editForm = document.createElement("form");
    editForm.setAttribute("id", "edit-todo");

    const title = document.createElement("input");
    title.type = "text";
    title.value = todo.title;
    title.required = true;
    title.setAttribute("aria-label", "Reminder Title");

    const description = document.createElement("textarea");
    description.value = todo.text || "";
    description.placeholder = "Notes (optional)";
    description.setAttribute("aria-label", "Notes");

    const date = document.createElement("input");
    date.type = "date";
    date.value = todo.date || "";
    date.setAttribute("aria-label", "Due Date");

    const projectSelect = document.createElement("select");
    projectSelect.setAttribute("aria-label", "Select List");

    projects.forEach((project) => {
        const option = document.createElement("option");
        option.value = project.name;
        option.textContent = project.name;

        // Find which project currently holds this todo
        if (project.todos && project.todos.includes(todo)) {
            option.selected = true;
        }

        projectSelect.appendChild(option);
    });

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "form-actions";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn-delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        if (onTodoDeleted) onTodoDeleted(todo);
    });

    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = "Save";

    buttonGroup.appendChild(deleteButton);
    buttonGroup.appendChild(cancelButton);
    buttonGroup.appendChild(saveButton);

    editForm.appendChild(title);
    editForm.appendChild(description);
    editForm.appendChild(date);
    editForm.appendChild(projectSelect);
    editForm.appendChild(buttonGroup);

    editForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const updatedData = {
            title: title.value.trim(),
            text: description.value.trim(),
            date: date.value
        };

        const selectProject = projects.find((project) => project.name === projectSelect.value);
        onTodoUpdated(todo, updatedData, selectProject);
    });

    cancelButton.addEventListener("click", () => {
        if (onCancel) onCancel();
        else editForm.remove();
    });

    return editForm;
}

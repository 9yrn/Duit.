export function editTodoUI(todo, projects, onTodoUpdated) {
    const editForm = document.createElement("form");
    editForm.setAttribute("id", "edit-todo");

    const title = document.createElement("input");
    title.type = "text";
    title.value = todo.title;

    const description = document.createElement("textarea");
    description.textContent = todo.text;
    const date = document.createElement("input");
    date.type = "date";
    date.value = todo.date;

    const projectSelect = document.createElement("select");

    projects.forEach((project) => {
        const option = document.createElement("option");

        option.value = project.name;
        option.textContent = project.name;

        if (project === todo.project) {
            option.selected = true;
        }
        
        projectSelect.appendChild(option);
    })

    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = "save";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "cancel";

    editForm.appendChild(title);
    editForm.appendChild(description);
    editForm.appendChild(date);
    editForm.appendChild(projectSelect);
    editForm.appendChild(saveButton);
    editForm.appendChild(cancelButton);

    editForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const updatedData = {
            title: title.value,
            text: description.value,
            date: date.value
        };

        const selectProject = projects.find((project) =>
             project.name === projectSelect.value);

        onTodoUpdated(todo, updatedData, selectProject);
        });

    return editForm;
}
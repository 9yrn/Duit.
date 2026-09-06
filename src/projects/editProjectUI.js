// DOM function for form creation for projects
export function editProjectUI(project, onProjectUpdated, onProjectDeleted) {
    const editForm = document.createElement("form");
    editForm.setAttribute("id", "edit-project");

    const projectTitle = document.createElement("input");
    projectTitle.setAttribute("type", "text");
    projectTitle.value = project.name;

    const saveButton = document.createElement("button");
    saveButton.setAttribute("type", "submit");
    saveButton.textContent = "save";

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.className = "btn-delete";
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", () => {
        if (onProjectDeleted) onProjectDeleted(project);
    });

    const cancel = document.createElement("button");
    cancel.setAttribute("type", "button");
    cancel.textContent = "cancel";

    editForm.appendChild(projectTitle);
    editForm.appendChild(saveButton);
    editForm.appendChild(deleteButton);
    editForm.appendChild(cancel);

    
    editForm.addEventListener("submit", (event) => {
        event.preventDefault();

        onProjectUpdated(project, projectTitle.value);
    });

    return editForm;
}
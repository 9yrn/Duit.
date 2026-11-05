// DOM function for form creation for editing projects
export function editProjectUI(project, onProjectUpdated, onProjectDeleted, onCancel) {
    const editForm = document.createElement("form");
    editForm.setAttribute("id", "edit-project");

    const projectTitle = document.createElement("input");
    projectTitle.setAttribute("type", "text");
    projectTitle.value = project.name;
    projectTitle.required = true;
    projectTitle.setAttribute("aria-label", "List Name");

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "form-actions";

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.className = "btn-delete";
    deleteButton.textContent = "Delete List";
    deleteButton.addEventListener("click", () => {
        if (onProjectDeleted) onProjectDeleted(project);
    });

    const cancel = document.createElement("button");
    cancel.setAttribute("type", "button");
    cancel.textContent = "Cancel";

    const saveButton = document.createElement("button");
    saveButton.setAttribute("type", "submit");
    saveButton.textContent = "Save";

    buttonGroup.appendChild(deleteButton);
    buttonGroup.appendChild(cancel);
    buttonGroup.appendChild(saveButton);

    editForm.appendChild(projectTitle);
    editForm.appendChild(buttonGroup);

    editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newTitle = projectTitle.value.trim();
        if (newTitle) {
            onProjectUpdated(project, newTitle);
        }
    });

    cancel.addEventListener("click", () => {
        if (onCancel) onCancel();
        else editForm.remove();
    });

    return editForm;
}

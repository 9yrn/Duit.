// DOM function for form creation for projects
export function createProjectUI(onProjectCreated, onCancel) {
    const projectPrompt = document.createElement("form");
    projectPrompt.setAttribute("class", "projectCreate");

    const projectTitle = document.createElement("input");
    projectTitle.setAttribute("type", "text");
    projectTitle.placeholder = "List Name";
    projectTitle.required = true;
    projectTitle.setAttribute("aria-label", "List Name");

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "form-actions";

    const cancel = document.createElement("button");
    cancel.setAttribute("type", "button");
    cancel.textContent = "Cancel";

    const projectCreate = document.createElement("button");
    projectCreate.setAttribute("type", "submit");
    projectCreate.textContent = "Create List";

    buttonGroup.appendChild(cancel);
    buttonGroup.appendChild(projectCreate);

    projectPrompt.appendChild(projectTitle);
    projectPrompt.appendChild(buttonGroup);

    projectPrompt.addEventListener("submit", (event) => {
        event.preventDefault();
        const projectTitleValue = projectTitle.value.trim();
        if (projectTitleValue) {
            onProjectCreated(projectTitleValue);
        }
    });

    cancel.addEventListener("click", () => {
        if (onCancel) {
            onCancel();
        } else {
            projectPrompt.remove();
        }
    });

    return projectPrompt;
}

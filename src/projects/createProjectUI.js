// DOM function for form creation for projects
export function createProjectUI(onProjectCreated) {
    const projectPrompt = document.createElement("form");
    projectPrompt.setAttribute("class", "projectCreate");

    const projectTitle = document.createElement("input");
    projectTitle.setAttribute("type", "text");
    projectTitle.placeholder = "Project Title";

    const cancel = document.createElement("button");
    cancel.setAttribute("type", "button");
    cancel.textContent = "cancel";

    const projectCreate = document.createElement("button");
    projectCreate.setAttribute("type", "submit");
    projectCreate.textContent = "create";

    projectPrompt.appendChild(projectTitle);
    projectPrompt.appendChild(projectCreate);
    projectPrompt.appendChild(cancel);


    
    projectPrompt.addEventListener("submit", (event) => {
        event.preventDefault();
        const projectTitleValue = projectTitle.value;

        onProjectCreated(projectTitleValue);
    });

    cancel.addEventListener("click", () => {
        cancel.remove();
    })

    return projectPrompt;
}
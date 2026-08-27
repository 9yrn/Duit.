import { createProject } from "./createProject";

export function createProjectUI(onProjectCreated) {
    const projectPrompt = document.createElement("form");
    projectPrompt.setAttribute("class", "projectCreate");

    const projectTitle = document.createElement("input");
    projectTitle.setAttribute("type", "text");
    projectTitle.textContent = "Project Title";

    const projectCancel = document.createElement("button");
    projectCancel.setAttribute("type", "button");
    projectCancel.textContent = "cancel";

    const projectCreate = document.createElement("button");
    projectCreate.setAttribute("type", "submit");
    projectCreate.textContent = "create";

    projectPrompt.appendChild(projectTitle);
    projectPrompt.appendChild(projectCancel);
    projectPrompt.appendChild(projectCreate);

    projectPrompt.addEventListener("submit", (event) => {
        event.preventDefault();
        const projectTitleValue = projectTitle.value;

        const newProject = createProject(projectTitleValue);
        onProjectCreated(newProject);
    });

    return projectPrompt;
}
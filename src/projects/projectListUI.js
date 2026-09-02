export function projectListUI(projects, onEditProject) {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-list");
    
    projects.forEach((project) => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project-element");

        const projectTitle = document.createElement("h3");
        projectTitle.textContent = project.name;

        const editButton = document.createElement("button");
        editButton.textContent = "edit";

        editButton.addEventListener("click", () => {
            onEditProject(project);
        });

        projectElement.appendChild(projectTitle);
        projectElement.appendChild(editButton);

        projectContainer.appendChild(projectElement);

    });

    return projectContainer;
};

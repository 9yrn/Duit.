export function projectListUI(projects, onSelectProject, onEditProject) {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-list");

    projects.forEach((project) => {
        const projectElement = document.createElement("article");
        projectElement.classList.add("project-element");

        const infoWrapper = document.createElement("div");
        infoWrapper.className = "project-info";
        infoWrapper.style.cursor = "pointer";

        const projectTitle = document.createElement("h3");
        projectTitle.textContent = project.name;

        const count = document.createElement("span");
        count.className = "badge";
        const total = project.todos ? project.todos.length : 0;
        count.textContent = `${total} ${total === 1 ? "reminder" : "reminders"}`;

        infoWrapper.appendChild(projectTitle);
        infoWrapper.appendChild(count);

        infoWrapper.addEventListener("click", () => {
            if (onSelectProject) onSelectProject(project);
        });

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "btn-secondary";
        editButton.textContent = "Edit";
        editButton.setAttribute("aria-label", `Edit ${project.name} list`);

        editButton.addEventListener("click", (e) => {
            e.stopPropagation();
            if (onEditProject) onEditProject(project);
        });

        projectElement.appendChild(infoWrapper);
        projectElement.appendChild(editButton);

        projectContainer.appendChild(projectElement);
    });

    return projectContainer;
}

export function saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjects() {
    const savedProjects = localStorage.getItem("projects");

    if (savedProjects === null) {
        return [{
            name: "Inbox",
            todos: []
        }];
    } 

    return JSON.parse(savedProjects);
}
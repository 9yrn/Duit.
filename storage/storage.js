export function saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjects() {
    const savedProjects = localStorage.getItem("projects");

    if (saveProjects === null) {
        return [];
    } 

    return JSON.parse(savedProjects);
}
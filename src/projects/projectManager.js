import { saveProjects, loadProjects } from "../../storage/storage.js";

const projects = loadProjects();

export function addProject (project) {
    projects.push(project);

    saveProjects(projects)
}

export function getProjects() {
    return projects;
}

export function getTodoToProject (project, todo) {
    project.todos.push(todo);

    saveProjects(projects);
}

export function addToDoToProject(project, todo) {
    project.todos.push(todo);
}
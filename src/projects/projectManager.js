import { saveProjects, loadProjects } from "../../storage/storage.js";

const projects = loadProjects();

export function addProject(project) {
    projects.push(project);
    saveProjects(projects);
}

export function getProjects() {
    return projects;
}

export function getTodoToProject(project, todo) {
    project.todos.push(todo);
    saveProjects(projects);
}

export function addToDoToProject(project, todo) {
    project.todos.push(todo);
    saveProjects(projects);
}

export function updateTodo(todo, updatedData) {
    todo.title = updatedData.title;
    todo.text = updatedData.text;
    todo.date = updatedData.date;
    if (updatedData.completed !== undefined) {
        todo.completed = updatedData.completed;
    }
    saveProjects(projects);
}

export function toggleTodo(todo) {
    todo.completed = !todo.completed;
    saveProjects(projects);
    return todo.completed;
}

export function updateProject(project, newName) {
    project.name = newName;
    saveProjects(projects);
}

export function deleteProject(project) {
    const index = projects.indexOf(project);
    if (index > -1) {
        projects.splice(index, 1);
        saveProjects(projects);
    }
}

export function deleteTodo(todo) {
    projects.forEach(project => {
        const index = project.todos.indexOf(todo);
        if (index > -1) {
            project.todos.splice(index, 1);
        }
    });
    saveProjects(projects);
}

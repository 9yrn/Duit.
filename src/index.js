import "./style.css";
import { entryFormUI } from "./entry/entryFormUI.js";
import { createProjectUI } from "./projects/createProjectUI.js";
import { addProject, getProjects, addToDoToProject } from "./projects/projectManager.js";
import { createProject } from "./projects/createProject.js";
import { getTodayTodos } from "./todos/todoFilters.js";

const add = document.getElementById("add");
const search = document.getElementById("search");
const upcoming = document.getElementById("upcoming");
const projects = document.getElementById("projects");
const activityContainer = document.querySelector(".activity-container");

//Test cases
const university = createProject("Hello");
addProject(university);
console.log(getProjects())
console.log(getTodayTodos(getProjects()));


const addButton = document.createElement("button");
addButton.textContent= "add";
add.appendChild(addButton);

addButton.addEventListener("click", () => {
    const entryForm = entryFormUI(getProjects(), (todo, project) => {
        addToDoToProject(project, todo);
        console.log(todo);
        console.log(project);
    });

    activityContainer.appendChild(entryForm);

    
})

const createProjectButton = document.createElement("button");
createProjectButton.textContent = "create project";
projects.appendChild(createProjectButton);

createProjectButton.addEventListener("click", () => {
    const projectForm = createProjectUI((projectTitle) => {
        const newProject = createProject(projectTitle);

        addProject(newProject);
        
        alert("Project Successfully Created");
        console.log(getProjects());
    });

    activityContainer.appendChild(projectForm);


})

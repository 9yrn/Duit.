import "./style.css";
import { entryFormUI } from "./entry/entryFormUI";
import { createProjectUI } from "./projects/createProjectUI";

const add = document.getElementById("add");
const search = document.getElementById("search");
const upcoming = document.getElementById("upcoming");
const projects = document.getElementById("projects");
const activityContainer = document.querySelector(".activity-container");



const addButton = document.createElement("button");
addButton.textContent= "add";
add.appendChild(addButton);

addButton.addEventListener("click", () => {
    const entryForm = entryFormUI((todo) => {
        console.log(todo);
    });

    entryContainer.appendChild(entryForm);

    
})

const createProjectButton = document.createElement("button");
createProjectButton.textContent = "create project";
projects.appendChild(createProjectButton);

createProjectButton.addEventListener("click", () => {
    const projectForm = createProjectUI((project) => {
        console.log(project);
    });

    activityContainer.appendChild(projectForm);


})

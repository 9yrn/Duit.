import "./style.css";
import { entryFormUI } from "./entry/entryFormUI.js";
import { createProjectUI } from "./projects/createProjectUI.js";
import { addProject, getProjects, addToDoToProject } from "./projects/projectManager.js";
import { createProject } from "./projects/createProject.js";
import { getTodayTodos, getUpcomingTodos, searchTodos, getAllTodos} from "./todos/todoFilters.js";
import { displayTodoListUI } from "./todos/todoListUI.js";
import { searchFormUI } from "./todos/searchUI.js";

const add = document.getElementById("add");
const search = document.getElementById("search");
const upcoming = document.getElementById("upcoming");
const today = document.getElementById("today");
const projects = document.getElementById("projects");
const viewAll = document.getElementById("allTodos");
const activityContainer = document.querySelector(".activity-container");

const addButton = document.createElement("button");
addButton.textContent= "add";
add.appendChild(addButton);

//Entries
addButton.addEventListener("click", () => {
    activityContainer.innerHTML= "";

    const entryForm = entryFormUI(getProjects(), (todo, project) => {
        addToDoToProject(project, todo);
        console.log(todo);
        console.log(project);
    });

    activityContainer.appendChild(entryForm);

    
})

//Create Project
const createProjectButton = document.createElement("button");
createProjectButton.textContent = "create project";
projects.appendChild(createProjectButton);

createProjectButton.addEventListener("click", () => {
    activityContainer.innerHTML= "";

    const projectForm = createProjectUI((projectTitle) => {
        const newProject = createProject(projectTitle);

        addProject(newProject);
        
        alert("Project Successfully Created");
        console.log(getProjects());
    });

    activityContainer.appendChild(projectForm);


})

//Upcoming
const createUpcomingButton = document.createElement("button");
createUpcomingButton.textContent = "upcoming";
upcoming.appendChild(createUpcomingButton);

createUpcomingButton.addEventListener("click", () => {
    const todos = getUpcomingTodos(getProjects());

    const todoList = displayTodoListUI(todos);

    //Empty out the container
    activityContainer.innerHTML = ""

    activityContainer.appendChild(todoList);

});

//Today
const createTodayButton = document.createElement("button");
createTodayButton.textContent = "today";
today.appendChild(createTodayButton);

createTodayButton.addEventListener("click", () => {
    const todos = getTodayTodos(getProjects());

    const todoList = displayTodoListUI(todos);

    //Empty out the container
    activityContainer.innerHTML = ""
    
    activityContainer.appendChild(todoList);

});

//Search
const createSearchButton = document.createElement("button");
createSearchButton.textContent = "search";
search.appendChild(createSearchButton);

createSearchButton.addEventListener("click", () => {
    activityContainer.innerHTML = "";


    const searchForm = searchFormUI((searchEntry) => {
        const results = searchTodos(getProjects(), searchEntry);

    console.log(results);

    
});

activityContainer.appendChild(displayTodoListUI(results));


});

//view all todos
const createViewAllButton = document.createElement("button");
createViewAllButton.textContent = "all";
viewAll.appendChild(createViewAllButton);

createViewAllButton.addEventListener("click", () => {
    activityContainer.innerHTML = "";

    const allTodos = getAllTodos(getProjects());

    const displayTodos = displayTodoListUI(allTodos);

    activityContainer.appendChild(displayTodos);
})
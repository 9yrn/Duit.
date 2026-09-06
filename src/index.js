import "./style.css";
import { entryFormUI } from "./entry/entryFormUI.js";
import { createProjectUI } from "./projects/createProjectUI.js";
import { addProject, getProjects, addToDoToProject, updateTodo, updateProject, deleteTodo, deleteProject } from "./projects/projectManager.js";
import { createProject } from "./projects/createProject.js";
import { getTodayTodos, getUpcomingTodos, searchTodos, getAllTodos} from "./todos/todoFilters.js";
import { displayTodoListUI } from "./todos/todoListUI.js";
import { searchFormUI } from "./todos/searchUI.js";
import { projectListUI } from "./projects/projectListUI.js";
import { editProjectUI } from "./projects/editProjectUI.js";
import { editTodoUI } from "./todos/editTodo.js";


const add = document.getElementById("add");
const search = document.getElementById("search");
const upcoming = document.getElementById("upcoming");
const today = document.getElementById("today");
const projects = document.getElementById("projects");
const all = document.getElementById("allTodos");
const activityContainer = document.querySelector(".activity-container");


//Entries
const addButton = document.createElement("button");
addButton.textContent= "Add Reminder";
add.appendChild(addButton);

addButton.addEventListener("click", () => {
    activityContainer.innerHTML= "";

    const entryForm = entryFormUI(getProjects(), (todo, project) => {
        addToDoToProject(project, todo);
        console.log(todo);
        console.log(project);
        alert("Duit Successfully Created");

        showAllTodos();
    });

    activityContainer.appendChild(entryForm);

    
})

//Create Project
const createProjectButton = document.createElement("button");
createProjectButton.textContent = "New List";
projects.appendChild(createProjectButton);

createProjectButton.addEventListener("click", () => {
    activityContainer.innerHTML= "";

    const projectForm = createProjectUI((projectTitle) => {
        const newProject = createProject(projectTitle);

        addProject(newProject);
        
        alert("Project Successfully Created");
        console.log(getProjects());

        showProjects();
    });

    activityContainer.appendChild(projectForm);



})

//Upcoming
const createUpcomingButton = document.createElement("button");
createUpcomingButton.textContent = "Upcoming";
upcoming.appendChild(createUpcomingButton);

createUpcomingButton.addEventListener("click", () => {
    const todos = getUpcomingTodos(getProjects());

    const todoList = displayTodoListUI(todos);

    //Empty out the container
    activityContainer.innerHTML = ""

    if (todos.length === 0) {
        const noTodosMessage = document.createElement("p");
        noTodosMessage.className = "empty-state-message";
        noTodosMessage.textContent = "No upcoming Duits.";
        activityContainer.appendChild(noTodosMessage);
    } else {
        activityContainer.appendChild(todoList);
    }

});

//Today
const createTodayButton = document.createElement("button");
createTodayButton.textContent = "Today";
today.appendChild(createTodayButton);

createTodayButton.addEventListener("click", () => {
    const todos = getTodayTodos(getProjects());

    const todoList = displayTodoListUI(todos);

    //Empty out the container
    activityContainer.innerHTML = ""
    
    if (todos.length === 0) {
        const noTodosMessage = document.createElement("p");
        noTodosMessage.className = "empty-state-message";
        noTodosMessage.textContent = "Nothing to do today?";
        activityContainer.appendChild(noTodosMessage);
    } else {
        activityContainer.appendChild(todoList);
    }

});

//Search
const createSearchButton = document.createElement("button");
createSearchButton.textContent = "Search";
search.appendChild(createSearchButton);

createSearchButton.addEventListener("click", () => {
    activityContainer.innerHTML = "";


    const searchForm = searchFormUI((searchEntry) => {
        const results = searchTodos(getProjects(), searchEntry);

        activityContainer.appendChild(displayTodoListUI(results));
        //test
        console.log(results);
    });

    activityContainer.appendChild(searchForm);



});

// View all todos

function showAllTodos() {
    const todos = getAllTodos(getProjects());

    const todoList = displayTodoListUI(
        todos,
        handleEditTodo
    );

    activityContainer.innerHTML = "";
    if (todos.length === 0) {
        const noTodosMessage = document.createElement("p");
        noTodosMessage.className = "empty-state-message";
        noTodosMessage.textContent = "No Duits. Click on 'Add Reminder' to add a new entry!";
        activityContainer.appendChild(noTodosMessage);
    } else {
        activityContainer.appendChild(todoList);
    }
}

// Edit todo 
function handleEditTodo(todo) {
    const editForm = editTodoUI(
        todo,
        getProjects(),
        (todo, updatedData, selectedProject) => {

            updateTodo(todo, updatedData);

            // Project changing will be handled separately
            console.log("Selected project:", selectedProject);

            alert("Todo successfully updated");

            showAllTodos();
        },
        (todo) => {
            deleteTodo(todo);
            alert("Todo successfully deleted");
            showAllTodos();
        }
    );

    activityContainer.innerHTML = "";
    activityContainer.appendChild(editForm);
}

//show projects

function showProjects() {
    const projectList = projectListUI(
        getProjects(),
        handleEditProject
    );

    activityContainer.innerHTML = "";
    if (getProjects().length === 0) {
        const noTodosMessage = document.createElement("p");
        noTodosMessage.className = "empty-state-message";
        noTodosMessage.textContent = "No projects entered.";
        activityContainer.appendChild(noTodosMessage);
    } else {
        activityContainer.appendChild(projectList);
    }
}

//edit project
function handleEditProject(project) {
    const editForm = editProjectUI(
        project,
        (project, newName) => {

            updateProject(project, newName);

            alert("Project successfully updated");

            showProjects();
        },
        (project) => {
            deleteProject(project);
            alert("Project successfully deleted");
            showProjects();
        }
    );

    activityContainer.innerHTML = "";
    activityContainer.appendChild(editForm);
}

//all todos
const allButton = document.createElement("button");
allButton.textContent = "All";

all.appendChild(allButton);

allButton.addEventListener("click", showAllTodos);
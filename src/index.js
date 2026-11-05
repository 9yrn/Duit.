import "./style.css";
import { entryFormUI } from "./entry/entryFormUI.js";
import { createProjectUI } from "./projects/createProjectUI.js";
import {
    addProject,
    getProjects,
    addToDoToProject,
    updateTodo,
    toggleTodo,
    updateProject,
    deleteTodo,
    deleteProject
} from "./projects/projectManager.js";
import { createProject } from "./projects/createProject.js";
import {
    getTodayTodos,
    getUpcomingTodos,
    searchTodos,
    getAllTodos
} from "./todos/todoFilters.js";
import { displayTodoListUI } from "./todos/todoListUI.js";
import { searchFormUI } from "./todos/searchUI.js";
import { editProjectUI } from "./projects/editProjectUI.js";
import { editTodoUI } from "./todos/editTodo.js";

const addSlot = document.getElementById("add");
const searchSlot = document.getElementById("search");
const upcomingSlot = document.getElementById("upcoming");
const todaySlot = document.getElementById("today");
const allSlot = document.getElementById("allTodos");
const projectsSlot = document.getElementById("projects");
const activityContainer = document.querySelector(".activity-container");

let currentView = { type: "all", project: null };

// --- Navigation Elements ---
const addButton = document.createElement("button");
addButton.className = "nav-btn nav-btn-primary";
addButton.textContent = "+ Add Reminder";
addSlot.appendChild(addButton);

const searchButton = document.createElement("button");
searchButton.className = "nav-btn";
searchButton.textContent = "Search";
searchSlot.appendChild(searchButton);

const todayButton = document.createElement("button");
todayButton.className = "nav-btn";
todayButton.textContent = "Today";
todaySlot.appendChild(todayButton);

const upcomingButton = document.createElement("button");
upcomingButton.className = "nav-btn";
upcomingButton.textContent = "Upcoming";
upcomingSlot.appendChild(upcomingButton);

const allButton = document.createElement("button");
allButton.className = "nav-btn";
allButton.textContent = "All";
allSlot.appendChild(allButton);

// --- Sidebar Projects List ---
function renderProjectsSidebar() {
    projectsSlot.innerHTML = "";

    const projectList = document.createElement("ul");
    projectList.className = "sidebar-project-list";

    getProjects().forEach((project) => {
        const item = document.createElement("li");
        const btn = document.createElement("button");
        btn.className = "nav-btn nav-btn-project";
        if (currentView.type === "project" && currentView.project === project) {
            btn.classList.add("is-active");
        }

        const nameSpan = document.createElement("span");
        nameSpan.className = "project-name";
        nameSpan.textContent = project.name;

        const countBadge = document.createElement("span");
        countBadge.className = "badge";
        countBadge.textContent = (project.todos || []).length;

        btn.appendChild(nameSpan);
        btn.appendChild(countBadge);

        btn.addEventListener("click", () => {
            currentView = { type: "project", project };
            renderCurrentView();
        });

        item.appendChild(btn);
        projectList.appendChild(item);
    });

    const newProjectBtn = document.createElement("button");
    newProjectBtn.className = "nav-btn nav-btn-add-list";
    newProjectBtn.textContent = "+ New List";
    newProjectBtn.addEventListener("click", showAddProject);

    projectsSlot.appendChild(projectList);
    projectsSlot.appendChild(newProjectBtn);
}

function updateActiveNav() {
    [searchButton, todayButton, upcomingButton, allButton].forEach((btn) => {
        btn.classList.remove("is-active");
    });

    if (currentView.type === "search") searchButton.classList.add("is-active");
    if (currentView.type === "today") todayButton.classList.add("is-active");
    if (currentView.type === "upcoming") upcomingButton.classList.add("is-active");
    if (currentView.type === "all") allButton.classList.add("is-active");

    renderProjectsSidebar();
}

function renderHeader(title, count, onEditAction = null) {
    const header = document.createElement("header");
    header.className = "view-header";

    const titleGroup = document.createElement("div");
    titleGroup.className = "view-title-group";

    const h2 = document.createElement("h2");
    h2.className = "view-title";
    h2.textContent = title;

    const countSpan = document.createElement("span");
    countSpan.className = "view-count";
    countSpan.textContent = count;

    titleGroup.appendChild(h2);
    titleGroup.appendChild(countSpan);
    header.appendChild(titleGroup);

    if (onEditAction) {
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "btn-secondary btn-header-action";
        editBtn.textContent = "Edit List";
        editBtn.addEventListener("click", onEditAction);
        header.appendChild(editBtn);
    }

    return header;
}

function renderEmptyState(message, actionLabel = "Add Reminder", onAction = null) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";

    const p = document.createElement("p");
    p.className = "empty-state-message";
    p.textContent = message;

    emptyState.appendChild(p);

    if (onAction) {
        const actionBtn = document.createElement("button");
        actionBtn.type = "button";
        actionBtn.className = "btn-secondary empty-state-btn";
        actionBtn.textContent = actionLabel;
        actionBtn.addEventListener("click", onAction);
        emptyState.appendChild(actionBtn);
    }

    return emptyState;
}

// --- View Renderers ---
function renderCurrentView() {
    updateActiveNav();
    activityContainer.innerHTML = "";

    if (currentView.type === "today") {
        const todos = getTodayTodos(getProjects());
        activityContainer.appendChild(renderHeader("Today", todos.length));
        if (todos.length === 0) {
            activityContainer.appendChild(
                renderEmptyState("No reminders due today.", "Add Reminder", showAddTodo)
            );
        } else {
            activityContainer.appendChild(displayTodoListUI(todos, handleEditTodo, handleToggleTodo));
        }
    } else if (currentView.type === "upcoming") {
        const todos = getUpcomingTodos(getProjects());
        activityContainer.appendChild(renderHeader("Upcoming", todos.length));
        if (todos.length === 0) {
            activityContainer.appendChild(
                renderEmptyState("No upcoming reminders scheduled.", "Schedule a Reminder", showAddTodo)
            );
        } else {
            activityContainer.appendChild(displayTodoListUI(todos, handleEditTodo, handleToggleTodo));
        }
    } else if (currentView.type === "project") {
        const project = currentView.project;
        // Verify project still exists
        if (!getProjects().includes(project)) {
            currentView = { type: "all", project: null };
            renderCurrentView();
            return;
        }

        const todos = project.todos || [];
        activityContainer.appendChild(
            renderHeader(project.name, todos.length, () => handleEditProject(project))
        );
        if (todos.length === 0) {
            activityContainer.appendChild(
                renderEmptyState(`No reminders in "${project.name}".`, "Add Reminder", () => showAddTodo(project.name))
            );
        } else {
            activityContainer.appendChild(displayTodoListUI(todos, handleEditTodo, handleToggleTodo));
        }
    } else if (currentView.type === "search") {
        activityContainer.appendChild(renderHeader("Search", ""));
        const searchUI = searchFormUI((query) => {
            const results = searchTodos(getProjects(), query);
            const existingResults = activityContainer.querySelector(".todo-list, .empty-state");
            if (existingResults) existingResults.remove();

            if (query && results.length === 0) {
                activityContainer.appendChild(renderEmptyState(`No results matching "${query}".`));
            } else if (results.length > 0) {
                activityContainer.appendChild(displayTodoListUI(results, handleEditTodo, handleToggleTodo));
            }
        });
        activityContainer.appendChild(searchUI);
    } else {
        // "all" is the default fallback view
        currentView = { type: "all", project: null };
        const todos = getAllTodos(getProjects());
        activityContainer.appendChild(renderHeader("All Reminders", todos.length));
        if (todos.length === 0) {
            activityContainer.appendChild(
                renderEmptyState("No reminders yet.", "Add Your First Reminder", showAddTodo)
            );
        } else {
            activityContainer.appendChild(displayTodoListUI(todos, handleEditTodo, handleToggleTodo));
        }
    }
}

// --- Action Handlers ---
function handleToggleTodo(todo) {
    toggleTodo(todo);
    renderCurrentView();
}

function showAddTodo(defaultProjectName = "") {
    activityContainer.innerHTML = "";
    activityContainer.appendChild(renderHeader("New Reminder", ""));

    const defaultName = typeof defaultProjectName === "string" && defaultProjectName
        ? defaultProjectName
        : (currentView.project ? currentView.project.name : (getProjects()[0]?.name || "Inbox"));

    const form = entryFormUI(
        getProjects(),
        (todo, assignedProject) => {
            addToDoToProject(assignedProject, todo);
            renderCurrentView();
        },
        () => renderCurrentView(),
        defaultName
    );

    activityContainer.appendChild(form);
}

function showAddProject() {
    activityContainer.innerHTML = "";
    activityContainer.appendChild(renderHeader("New List", ""));

    const form = createProjectUI(
        (projectTitle) => {
            const newProj = createProject(projectTitle);
            addProject(newProj);
            currentView = { type: "project", project: newProj };
            renderCurrentView();
        },
        () => renderCurrentView()
    );

    activityContainer.appendChild(form);
}

function handleEditTodo(todo) {
    activityContainer.innerHTML = "";
    activityContainer.appendChild(renderHeader("Edit Reminder", ""));

    const form = editTodoUI(
        todo,
        getProjects(),
        (targetTodo, updatedData, selectedProject) => {
            updateTodo(targetTodo, updatedData);

            // Move todo to another project if selection changed
            if (selectedProject) {
                const currentHolder = getProjects().find((p) => (p.todos || []).includes(targetTodo));
                if (currentHolder && currentHolder !== selectedProject) {
                    const idx = currentHolder.todos.indexOf(targetTodo);
                    if (idx > -1) currentHolder.todos.splice(idx, 1);
                    selectedProject.todos.push(targetTodo);
                    // trigger save via updateTodo
                    updateTodo(targetTodo, {});
                }
            }

            renderCurrentView();
        },
        (targetTodo) => {
            deleteTodo(targetTodo);
            renderCurrentView();
        },
        () => renderCurrentView()
    );

    activityContainer.appendChild(form);
}

function handleEditProject(project) {
    activityContainer.innerHTML = "";
    activityContainer.appendChild(renderHeader(`Edit "${project.name}"`, ""));

    const form = editProjectUI(
        project,
        (targetProj, newName) => {
            updateProject(targetProj, newName);
            renderCurrentView();
        },
        (targetProj) => {
            deleteProject(targetProj);
            currentView = { type: "all", project: null };
            renderCurrentView();
        },
        () => renderCurrentView()
    );

    activityContainer.appendChild(form);
}

// --- Event Listeners for Nav ---
addButton.addEventListener("click", () => showAddTodo());

searchButton.addEventListener("click", () => {
    currentView = { type: "search", project: null };
    renderCurrentView();
});

todayButton.addEventListener("click", () => {
    currentView = { type: "today", project: null };
    renderCurrentView();
});

upcomingButton.addEventListener("click", () => {
    currentView = { type: "upcoming", project: null };
    renderCurrentView();
});

allButton.addEventListener("click", () => {
    currentView = { type: "all", project: null };
    renderCurrentView();
});

// Initial boot: start on Today if any exist, otherwise All
const initialToday = getTodayTodos(getProjects());
currentView = { type: initialToday.length > 0 ? "today" : "all", project: null };
renderCurrentView();

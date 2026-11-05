import test from "node:test";
import assert from "node:assert/strict";

// In-memory mock for localStorage in Node test environment
const store = new Map();
globalThis.localStorage = {
    getItem(key) {
        return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
        store.set(key, String(value));
    },
    removeItem(key) {
        store.delete(key);
    },
    clear() {
        store.clear();
    }
};

const { createToDo } = await import("../src/entry/todo.js");
const { createProject } = await import("../src/projects/createProject.js");
const {
    addProject,
    getProjects,
    addToDoToProject,
    toggleTodo,
    updateTodo,
    deleteTodo,
    deleteProject
} = await import("../src/projects/projectManager.js");
const {
    getAllTodos,
    getTodayTodos,
    getUpcomingTodos,
    searchTodos
} = await import("../src/todos/todoFilters.js");

test("createToDo initializes with completed=false by default", () => {
    const todo = createToDo("Test Task", "Notes", "2026-11-05");
    assert.equal(todo.title, "Test Task");
    assert.equal(todo.text, "Notes");
    assert.equal(todo.date, "2026-11-05");
    assert.equal(todo.completed, false);
});

test("createToDo supports explicit completed state", () => {
    const todo = createToDo("Done Task", "Notes", "2026-11-05", "Inbox", true);
    assert.equal(todo.completed, true);
});

test("projectManager creates and stores projects", () => {
    const initialCount = getProjects().length;
    const proj = createProject("Work Tasks");
    addProject(proj);

    assert.equal(getProjects().length, initialCount + 1);
    assert.ok(getProjects().some(p => p.name === "Work Tasks"));
});

test("addToDoToProject and toggleTodo toggle completion state", () => {
    const proj = createProject("Groceries");
    addProject(proj);

    const item = createToDo("Apples", "Buy 6 Honeycrisp", "2026-11-05");
    addToDoToProject(proj, item);

    assert.equal(item.completed, false);
    const toggled = toggleTodo(item);
    assert.equal(toggled, true);
    assert.equal(item.completed, true);

    const toggledBack = toggleTodo(item);
    assert.equal(toggledBack, false);
    assert.equal(item.completed, false);
});

test("updateTodo updates todo properties", () => {
    const proj = createProject("Fitness");
    addProject(proj);

    const item = createToDo("Run", "3km", "2026-11-05");
    addToDoToProject(proj, item);

    updateTodo(item, { title: "Sprint", text: "5km", date: "2026-11-06" });
    assert.equal(item.title, "Sprint");
    assert.equal(item.text, "5km");
    assert.equal(item.date, "2026-11-06");
});

test("searchTodos finds tasks by title and description case-insensitively", () => {
    const proj = createProject("Research");
    addProject(proj);

    const item1 = createToDo("Read Apple HIG", "Review typography & buttons", "2026-11-05");
    const item2 = createToDo("Buy Milk", "Whole organic milk", "2026-11-05");
    addToDoToProject(proj, item1);
    addToDoToProject(proj, item2);

    const foundByTitle = searchTodos(getProjects(), "apple");
    assert.ok(foundByTitle.some(t => t.title === "Read Apple HIG"));

    const foundByText = searchTodos(getProjects(), "organic");
    assert.ok(foundByText.some(t => t.text === "Whole organic milk"));

    const empty = searchTodos(getProjects(), "nonexistentquery123");
    assert.equal(empty.length, 0);
});

test("deleteTodo removes todo from project", () => {
    const proj = createProject("Cleanup");
    addProject(proj);

    const item = createToDo("Temp Task", "", "2026-11-05");
    addToDoToProject(proj, item);

    assert.ok(proj.todos.includes(item));
    deleteTodo(item);
    assert.ok(!proj.todos.includes(item));
});

test("deleteProject removes project from list", () => {
    const proj = createProject("To be deleted");
    addProject(proj);

    const countBefore = getProjects().length;
    deleteProject(proj);
    assert.equal(getProjects().length, countBefore - 1);
    assert.ok(!getProjects().includes(proj));
});


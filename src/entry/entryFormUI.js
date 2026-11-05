import { createToDo } from "./todo.js";

// DOM function to initialize the form creation for entries.
export function entryFormUI(projects, onTodoCreated, onCancel, defaultProjectName = "") {
    const entry = document.createElement("form");
    entry.setAttribute("id", "entry");

    const title = document.createElement("input");
    title.setAttribute("type", "text");
    title.placeholder = "Reminder Title";
    title.required = true;
    title.setAttribute("aria-label", "Reminder Title");

    const entryContent = document.createElement("textarea");
    entryContent.placeholder = "Notes (optional)";
    entryContent.setAttribute("aria-label", "Notes");

    const date = document.createElement("input");
    date.setAttribute("type", "date");
    date.setAttribute("aria-label", "Due Date");

    // Select option is initialized which will show all current projects
    const projectSelect = document.createElement("select");
    projectSelect.required = true;
    projectSelect.setAttribute("aria-label", "Select List");

    projects.forEach((project) => {
        const option = document.createElement("option");
        option.value = project.name;
        option.textContent = project.name;
        if (project.name === defaultProjectName) {
            option.selected = true;
        }
        projectSelect.appendChild(option);
    });

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "form-actions";

    const cancel = document.createElement("button");
    cancel.setAttribute("type", "button");
    cancel.textContent = "Cancel";

    const submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.textContent = "Add";

    buttonGroup.appendChild(cancel);
    buttonGroup.appendChild(submit);

    entry.appendChild(title);
    entry.appendChild(entryContent);
    entry.appendChild(date);
    entry.appendChild(projectSelect);
    entry.appendChild(buttonGroup);

    entry.addEventListener("submit", (event) => {
        event.preventDefault();
        const titleValue = title.value.trim();
        if (!titleValue) return;

        const entryContentValue = entryContent.value.trim();
        const dateValue = date.value;
        const selectedProject = projectSelect.value;
        const assignedProject = projects.find((project) => project.name === selectedProject) || projects[0];
        const todo = createToDo(titleValue, entryContentValue, dateValue);

        onTodoCreated(todo, assignedProject);
    });

    cancel.addEventListener("click", () => {
        if (onCancel) {
            onCancel();
        } else {
            entry.remove();
        }
    });

    return entry;
}

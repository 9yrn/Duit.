import { createToDo } from "./todo.js";

//DOM function to initialize the form creation for entries.

export function entryFormUI(projects, onTodoCreated) {

    const entry = document.createElement("form");
    entry.setAttribute("id", "entry");

    const title = document.createElement("input");
    title.setAttribute("type", "text");
    title.placeholder= "title";

    const entryContent = document.createElement("textarea");
    entryContent.placeholder = "Entry"

    const date = document.createElement("input");
    date.setAttribute("type", "date");

    //Select option is initialized which will show all current projects
    const projectSelect = document.createElement("select");
    projectSelect.required = true;
    projects.forEach((project) => {
        const option = document.createElement("option");

        option.value = project.name;
        option.textContent = project.name;

        projectSelect.appendChild(option);
    });

    const cancel = document.createElement("button");
    cancel.setAttribute("type", "button");
    cancel.textContent = "cancel";


    const submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.textContent = "submit";

    entry.appendChild(title);
    entry.appendChild(entryContent);
    entry.appendChild(date);
    entry.appendChild(projectSelect);
    entry.appendChild(cancel);
    entry.appendChild(submit);


    entry.addEventListener("submit", (event) => {
        //Initialize values for the todo entry prior to being passed onto the creation function
        event.preventDefault();
        const titleValue = title.value;
        const entryContentValue = entryContent.value;
        const dateValue = date.value;
        const selectedProject = projectSelect.value;
        const assignedProject = projects.find((project) => {
            return project.name === selectedProject;
        })
        const todo = createToDo(titleValue, entryContentValue, dateValue);

        onTodoCreated(todo, assignedProject);

    });

    cancel.addEventListener("click", () => {
        entry.remove();
    })

    return entry;
}


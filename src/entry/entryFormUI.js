import { createToDo } from "./todo";


export function entryFormUI(onTodoCreated) {

    const entry = document.createElement("form");
    entry.setAttribute("id", "entry");

    const title = document.createElement("input");
    title.setAttribute("type", "text");
    title.textContent= "title";

    const entryContent = document.createElement("textarea");
    entryContent.textContent = "Entry"

    const date = document.createElement("input");
    date.setAttribute("type", "date");

    const submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.textContent = "submit";

    entry.appendChild(title);
    entry.appendChild(entryContent);
    entry.appendChild(date);
    entry.appendChild(submit);

    entry.addEventListener("submit", (event) => {
        event.preventDefault();
        const titleValue = title.value;
        const entryContentValue = entryContent.value;
        const dateValue = date.value;
        const todo = createToDo(titleValue, entryContentValue, dateValue);

        onTodoCreated(todo);

    });

    return entry;
}

//create event listener in script.js

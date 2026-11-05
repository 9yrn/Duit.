export function createToDo(title, text, date, project, completed = false) {
    return {
        title,
        text,
        date,
        project,
        completed: Boolean(completed)
    };
}

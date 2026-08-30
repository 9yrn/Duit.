import {isToday, parseISO} from "date-fns";

export function getTodayTodos(projects) {
    const todayTodos = [];

    // Running two layers as todos is a sub array for todo
    projects.forEach((project) => {
        project.todos.forEach((todo) => {
            //Basically asks "is the duedate for the todo today"
            if (isToday(parseISO(todo.dueDate))) {
                todayTodos.push(todo);
            }
        });
        
    });

    return todayTodos;
}
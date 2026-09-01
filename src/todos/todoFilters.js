import {isToday, isAfter, parseISO, startOfDay} from "date-fns";

export function getTodayTodos(projects) {
    const todayTodos = [];

    // Running two layers as todos is a sub array for todo
    projects.forEach((project) => {
        project.todos.forEach((todo) => {
            //Basically asks "is the duedate for the todo today"
            if (isToday(parseISO(todo.date))) {
                todayTodos.push(todo);
            }
        });
        
    });

    return todayTodos;
}

export function getUpcomingTodos(projects) {
    const upcomingTodos = [];
    const today = startOfDay(new Date())

    projects.forEach((project) => {
        project.todos.forEach((todo) => {
            //Logic: Is ToDo's date after today?
            if (isAfter(parseISO(todo.date), today)) {
                upcomingTodos.push(todo);
            }
        }); 
    });

    return upcomingTodos;
}

export function searchTodos(projects, searchEntry) {
    //Both the search entry and array content is set to lower case since the .includes function is case sensitive
    const search = searchEntry.toLowerCase();
    const searchResults = [];

    projects.forEach((project) => {
        project.todos.forEach((todo) => {
            if (todo.title.toLowerCase().includes(search) || (todo.text.toLowerCase().includes(search)))  {
                searchResults.push(todo);
            }
        });
    });

    return searchResults;
}
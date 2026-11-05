import { isToday, isAfter, parseISO, startOfDay } from "date-fns";

export function getTodayTodos(projects) {
    const todayTodos = [];
    projects.forEach((project) => {
        if (!project.todos) return;
        project.todos.forEach((todo) => {
            if (todo.date && isToday(parseISO(todo.date))) {
                todayTodos.push(todo);
            }
        });
    });
    return todayTodos;
}

export function getUpcomingTodos(projects) {
    const upcomingTodos = [];
    const today = startOfDay(new Date());

    projects.forEach((project) => {
        if (!project.todos) return;
        project.todos.forEach((todo) => {
            if (todo.date && isAfter(parseISO(todo.date), today)) {
                upcomingTodos.push(todo);
            }
        });
    });

    return upcomingTodos;
}

export function searchTodos(projects, searchEntry) {
    const search = searchEntry.trim().toLowerCase();
    if (!search) return [];

    const searchResults = [];
    projects.forEach((project) => {
        if (!project.todos) return;
        project.todos.forEach((todo) => {
            const titleMatch = todo.title && todo.title.toLowerCase().includes(search);
            const textMatch = todo.text && todo.text.toLowerCase().includes(search);
            if (titleMatch || textMatch) {
                searchResults.push(todo);
            }
        });
    });

    return searchResults;
}

export function getAllTodos(projects) {
    const allTodos = [];
    projects.forEach((project) => {
        if (!project.todos) return;
        project.todos.forEach((todo) => {
            allTodos.push(todo);
        });
    });
    return allTodos;
}

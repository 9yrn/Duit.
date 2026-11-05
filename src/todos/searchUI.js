export function searchFormUI(onSearch) {
    const searchForm = document.createElement("form");
    searchForm.className = "search-form";

    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "search");
    searchInput.setAttribute("placeholder", "Search reminders...");
    searchInput.setAttribute("aria-label", "Search reminders");
    searchInput.autofocus = true;

    searchForm.appendChild(searchInput);

    const handleSearch = () => {
        const query = searchInput.value.trim();
        onSearch(query);
    };

    searchInput.addEventListener("input", handleSearch);

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        handleSearch();
    });

    return searchForm;
}

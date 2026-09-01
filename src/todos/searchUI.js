
export function searchFormUI(onSearch) {
    const searchForm = document.createElement("form");

    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "search");
    searchInput.setAttribute("placeholder", "search todos...");

    const searchButton = document.createElement("button");
    searchButton.setAttribute("type", "submit");
    searchButton.textContent = "search";

    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchEntry = searchInput.value;

        onSearch(searchEntry);
    })

    return searchForm

}
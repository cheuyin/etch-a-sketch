const drawingGrid = document.querySelector(".grid")
const gridSizeSliderLabel = document.querySelector(".grid-size-slider label")
const gridSizeSlider = document.querySelector(".grid-size-slider");
const initialGridSize = 10;

renderGrid(initialGridSize)
showGridSize(initialGridSize)

gridSizeSlider.addEventListener("input", (event) => {
    showGridSize(event.target.value);
});

gridSizeSlider.addEventListener("change", (event) => {
    renderGrid(+event.target.value);
});


function renderGrid (size) {
    deleteOldGrid();
    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.add("row")
        for (let j = 0; j < size; j++) {
            const square = document.createElement("div");
            square.classList.add("square");
            row.appendChild(square);
    
            square.addEventListener("mouseover", () => {
                square.classList.add("hover")
            });
        }
        drawingGrid.appendChild(row);
    }
}

function showGridSize(size) {
    gridSizeSliderLabel.textContent = size + " × " + size;
}

function deleteOldGrid() {
    drawingGrid.textContent = "";
}
const drawingGrid = document.querySelector(".grid")
const gridSizeSliderLabel = document.querySelector(".grid-size-slider label")
const gridSizeSlider = document.querySelector(".grid-size-slider input");
const initialGridSize = 10;
const clearButton = document.querySelector(".clear button");

renderGrid(initialGridSize)
showGridSize(initialGridSize)

gridSizeSlider.addEventListener("input", (event) => {
    event.target.setAttribute("value", event.target.value); // Update slider attribute
    showGridSize(event.target.value);
});

gridSizeSlider.addEventListener("change", (event) => {
    renderGrid(+event.target.value);
});

clearButton.addEventListener("click", () => {
    deleteOldGrid();
    const currentGridSize = gridSizeSlider.getAttribute("value")
    console.log(currentGridSize);
    renderGrid(currentGridSize);
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
            square.addEventListener("mousedown", turnOnDrawing);
        }
        drawingGrid.appendChild(row);
    }

    // If mouse click is released anywhere on the page, stop drawing
    document.addEventListener("mouseup", turnOffDrawing);
}

function showGridSize(size) {
    gridSizeSliderLabel.textContent = size + " × " + size;
}

function deleteOldGrid() {
    drawingGrid.textContent = "";
}

function turnOnDrawing(event) {
    colorSquare(event);
    const rows = [...drawingGrid.children];
    for (row of rows) {
        const squareList = [...row.children];
        for (square of squareList) {
            square.addEventListener("mouseover", colorSquare);
        }
    }
}

function turnOffDrawing() {
    const rows = [...drawingGrid.children];
    for (row of rows) {
        const squareList = [...row.children];
        for (square of squareList) {
            square.removeEventListener("mouseover", colorSquare);
        }
    }
}

function colorSquare(event) {
    event.target.classList.add("color-black")
}
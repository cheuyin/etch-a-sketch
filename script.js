const drawingGrid = document.querySelector(".grid")
const gridSizeSliderLabel = document.querySelector(".grid-size-slider label")
const gridSizeSlider = document.querySelector(".grid-size-slider input");
const initialGridSize = 10;
const clearButton = document.querySelector(".clear button");
const eraserButton = document.querySelector(".eraser button");

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
    renderGrid(currentGridSize);
});

eraserButton.addEventListener("click", (event) => {
    event.target.classList.toggle("on");
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
            square.addEventListener("mousedown", turnOnDrawingOrErasing);
        }
        drawingGrid.appendChild(row);
    }

    // If mouse click is released anywhere on the page, stop drawing
    document.addEventListener("mouseup", turnOffDrawingOrErasing);
}

function showGridSize(size) {
    gridSizeSliderLabel.textContent = size + " × " + size;
}

function deleteOldGrid() {
    drawingGrid.textContent = "";
}

function turnOnDrawingOrErasing(event) {
    eraserButton.classList.contains("on") ? eraseSquare(event) : colorSquare(event);
    const rows = [...drawingGrid.children];
    for (row of rows) {
        const squareList = [...row.children];
        for (square of squareList) {
            if (eraserButton.classList.contains("on")) {
                square.addEventListener("mouseover", eraseSquare);
            } else {
                square.addEventListener("mouseover", colorSquare);
            }
        }
    }
}

function turnOffDrawingOrErasing() {
    const rows = [...drawingGrid.children];
    for (row of rows) {
        const squareList = [...row.children];
        for (square of squareList) {
            if (eraserButton.classList.contains("on")) {
                square.removeEventListener("mouseover", eraseSquare);
            } else {
                square.removeEventListener("mouseover", colorSquare);
            }
        }
    }
}

function colorSquare(event) {
    event.target.classList.add("color-black")
}

function eraseSquare(event) {
    for (className of event.target.classList) {
        if (className !== "square") {
            event.target.classList.remove("color-black");
        }
    }
}


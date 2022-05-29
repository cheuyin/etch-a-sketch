const drawingGrid = document.querySelector(".grid")
const gridSizeSliderLabel = document.querySelector(".grid-size-slider label")
const gridSizeSlider = document.querySelector(".grid-size-slider input");
const initialGridSize = 10;
const clearButton = document.querySelector(".clear button");
const eraserButton = document.querySelector(".eraser button");
const rainbowModeButton = document.querySelector(".rainbow-mode button");

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
    rainbowModeButton.classList.remove("on");
    event.target.classList.toggle("on");
});

rainbowModeButton.addEventListener("click", (event) => {
    eraserButton.classList.remove("on");
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
    if (event.target.getAttribute("style") !== null) {
        return;
    }
    if (rainbowModeButton.classList.contains("on")) {
        const randomColor = generateRandomRGBColor();
        event.target.setAttribute("style", `background-color: ${randomColor}`);
        return;
    }
    event.target.style.backgroundColor = "black"
}

function eraseSquare(event) {
    event.target.removeAttribute("style");
}

function generateRandomRGBColor() {
    const randomR = Math.floor(Math.random() * 255) + 1;
    const randomG = Math.floor(Math.random() * 255) + 1;
    const randomB = Math.floor(Math.random() * 255) + 1;
    return `rgb(${randomR},${randomG},${randomB})`;
}
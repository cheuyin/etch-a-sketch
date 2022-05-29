const drawingGrid = document.querySelector(".grid")
const gridSizeSliderLabel = document.querySelector(".grid-size-slider label")
const gridSizeSlider = document.querySelector(".grid-size-slider input");
const initialGridSize = 10;
const clearButton = document.querySelector(".clear button");
const eraserButton = document.querySelector(".eraser button");
const rainbowModeButton = document.querySelector(".rainbow-mode button");
const colorPicker = document.querySelector(".color-picker input");
const shadingModeButton = document.querySelector(".shading-mode button");


let currentColor = [];

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

colorPicker.addEventListener("change", (event) => {
    eraserButton.classList.remove("on");
    rainbowModeButton.classList.remove("on");
    event.target.setAttribute("value", event.target.value);
});

shadingModeButton.addEventListener("click", (event) => {
    eraserButton.classList.remove("on");
    event.target.classList.toggle("on")
})

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
    if (event.target.style.backgroundColor !== "") {
        return false;
    }
    
    // Color randomly if rainbow mode is on
    if (rainbowModeButton.classList.contains("on")) {
        const randomColor = generateRandomRGBColor();
        event.target.setAttribute("style", `background-color: ${randomColor}`);
        return;
    }

    // If shading mode on, increase opacity if less than 1
    if (shadingModeButton.classList.contains("on")) {
        const currentColor = RGBHexToDecimal(colorPicker.getAttribute("value"));
        console.log(currentColor)
        event.target.style.backgroundColor = `rgba(${currentColor[0]}, 
                    ${currentColor[1]}, 
                    ${currentColor[2]}, 
                    ${0.1})`;
        return;
    }

    // Color the square
    event.target.style.backgroundColor = colorPicker.getAttribute("value");
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

function RGBHexToDecimal (hexString) {;
    const r = parseInt(hexString.slice(1, 3), 16);
    const g = parseInt(hexString.slice(3, 5), 16);
    const b = parseInt(hexString.slice(5), 16);
    return [r, g, b];
}
const drawingGrid = document.querySelector(".grid")
const gridSizeSliderLabel = document.querySelector(".grid-size-slider label")
const gridSizeSlider = document.querySelector(".grid-size-slider input");
const initialGridSize = 10;
const clearButton = document.querySelector(".clear button");
const eraserButton = document.querySelector(".eraser button");
const rainbowModeButton = document.querySelector(".rainbow-mode button");
const colorPicker = document.querySelector(".color-picker input");
const shadingModeButton = document.querySelector(".shading-mode button");


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
    eraserButton.classList.remove("on");
    deleteOldGrid();
    const currentGridSize = gridSizeSlider.getAttribute("value")
    renderGrid(currentGridSize);
});

eraserButton.addEventListener("click", (event) => {
    rainbowModeButton.classList.remove("on");
    shadingModeButton.classList.remove("on");
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
    gridSizeSliderLabel.textContent = size + " ?? " + size;
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
    const square = event.target;

    // Check if shading mode is turned on
    if (shadingModeButton.classList.contains("on")) {
        shadeSquare(event);
        return;
    }

    // Do not color if square has already been colored
    if (square.style.backgroundColor !== "") {
        return false;
    }
    
    // Color randomly if rainbow mode is on
    if (rainbowModeButton.classList.contains("on")) {
        const randomColor = generateRandomRGBColor();
        square.setAttribute("style", `background-color: ${randomColor}`);
        return;
    }

    // Color the square
    square.style.backgroundColor = getColorPickerColor();
}

function eraseSquare(event) {
    event.target.removeAttribute("style");
}

function generateRandomRGBColor(opacity = 1) {
    const randomR = Math.floor(Math.random() * 255) + 1;
    const randomG = Math.floor(Math.random() * 255) + 1;
    const randomB = Math.floor(Math.random() * 255) + 1;
    return `rgba(${randomR},${randomG},${randomB}, ${opacity})`;
}

function RGBHexToDecimal (hexString) {;
    const r = parseInt(hexString.slice(1, 3), 16);
    const g = parseInt(hexString.slice(3, 5), 16);
    const b = parseInt(hexString.slice(5), 16);
    return [r, g, b];
}

function shadeSquare(event) {
    const square = event.target;

    if (square.style.backgroundColor === "" && rainbowModeButton.classList.contains("on")) {
        square.style.backgroundColor = generateRandomRGBColor(0.1);
        return;
    }

    if (square.style.backgroundColor === "") {
        square.style.backgroundColor = getColorPickerColor(0.1);
        return;
    }

    let currentColor = parse_rgb_string(square.style.backgroundColor);

    let currentOpacity = +currentColor[3] / 10;

    if (currentOpacity <= 0.8) {
        currentOpacity += 0.2;
    }

    square.style.backgroundColor = `rgba(${currentColor[0]}, 
                ${currentColor[1]}, 
                ${currentColor[2]}, 
                ${currentOpacity})`;
} 

function parse_rgb_string(rgb) {
    rgb = rgb.replace(/[^\d,]/g, '').split(',');
    return rgb;
 }

 function getColorPickerColor(opacity=1) {
    const color = RGBHexToDecimal(colorPicker.getAttribute("value"));
    return `rgba(${color[0]}, 
        ${color[1]}, 
        ${color[2]},
        ${opacity})`;
 }
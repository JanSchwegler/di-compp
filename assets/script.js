// let
// let - sizing and positioning
let screenWidth = document.documentElement.clientWidth || window.innerWidth;
let screenHeight = document.documentElement.clientHeight || window.innerHeight;
let scrollPos = window.scrollY || window.pageYOffset;
// let - bg noise
let mouseDownBool = false;
let bgNoiseContainer;
let bgNoiseCanvas;
// let - navigation
let navElements;
let navSelector;
let navActive = 0;
let navSelectedColor = "hsl(120, 10%, 10%)";
let navBaseColor = "hsl(120, 3%, 60%)";
let navScrolling = false;
// let - sections
let sections;
// let - unknown life
let sectionUnknownLife;
let buttonUnknownLifeInitialised = false;
let buttonUnknownLife;
let dataUnknownLife;
let createdImagesUnknownLife = [];
let imgUnknownLife = new Image();
let canvasContainerUnknownLife;
let canvasUnknownLife;
let ctxUnknownLife;
let promptContainerUnknownLife;

// on load
document.addEventListener('DOMContentLoaded', function () {
    // fetch data
    fetch('assets/unknownLife.json')
    .then(response => response.json())
    .then(data => {
        dataUnknownLife = data;
    });
    imgUnknownLife.onload = unknownLifeimageLoaded;

    // get elements
    bgNoiseContainer = document.getElementById("bgNoiseContainer");
    bgNoiseCanvas = document.getElementById("bgNoise");
    navElements = document.querySelector("nav").querySelectorAll(":nth-child(-n+3)");
    navSelector = document.getElementById("selection");
    sections = document.querySelectorAll(".nav-section");
    sectionUnknownLife = document.getElementById("unknown-life");
    buttonUnknownLife = sectionUnknownLife.querySelector("#button-generate");
    canvasContainerUnknownLife = sectionUnknownLife.querySelector("#canvas-container");
    canvasUnknownLife = canvasContainerUnknownLife.querySelector("#canvas");
    ctxUnknownLife = canvasUnknownLife.getContext("2d", { willReadFrequently: true });
    promptContainerUnknownLife = sectionUnknownLife.querySelector("div > div:not(#canvas-container)");

    // event listeners
    navElements.forEach(function(element) {
        element.addEventListener("click", handleNavClick);
        element.addEventListener("mouseenter", handleNavHover);
        element.addEventListener("mouseleave", setNavSelection);
    });
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener('mouseenter', mouseBackgroundNoiseEnter);
    document.addEventListener('mousemove', mouseBackgroundNoiseMove);
    document.addEventListener('mouseleave', mouseBackgroundNoiseLeave);
    sectionUnknownLife.addEventListener('mousemove', unknownLifeMouseMove);
    sectionUnknownLife.addEventListener('mouseleave', unknownLifeMouseLeave);
    sectionUnknownLife.addEventListener('click', unknownLifeClickHandler);

    // function calls
    startup();
    resizeCanvas();
    updateNoise();
    setTimeout(setNavSelection, 100); // Timeout needed to get correct width
    setTimeout(setNavSelection, 500); // Timeout needed to get correct width
    initialCanvas();
});

// on resize
window.addEventListener("resize", function() {
    // update screen width and height
    screenWidth = document.documentElement.clientWidth || window.innerWidth;
    screenHeight = document.documentElement.clientHeight || window.innerHeight;

    // function calls
    setNavSelection();
    initialCanvas();
});

// on scroll
window.addEventListener("scroll", function() {
    // update scroll position
    scrollPos = window.scrollY || window.pageYOffset;

    // function calls
    handleNavScroll();
});

// functions
function startup() {
    // show nav selection
    document.getElementById("selection").style.opacity = "1";
}

function mouseDown() {
    mouseDownBool = true;
}

function mouseUp() {
    mouseDownBool = false;
}

// function - bg noise
function resizeCanvas() {
    bgNoiseCanvas.width = bgNoiseContainer.getBoundingClientRect().width;
    bgNoiseCanvas.height = bgNoiseContainer.getBoundingClientRect().height;
}

function mouseBackgroundNoiseEnter() {
    bgNoiseContainer.style.opacity = "0.1";
}

function mouseBackgroundNoiseMove(event) {
    let mouseX = event.clientX - (bgNoiseContainer.getBoundingClientRect().width / 2);
    let mouseY = (event.clientY + window.scrollY) - (bgNoiseContainer.getBoundingClientRect().height / 2);
    bgNoiseContainer.style.left = mouseX + "px";
    bgNoiseContainer.style.top = mouseY + "px";

    if (!buttonUnknownLifeInitialised) {
        initialButtonUnknownLife();
        buttonUnknownLifeInitialised = true;
    }
}

function mouseBackgroundNoiseLeave() {
    bgNoiseContainer.style.opacity = "0";
}

function generateNoise() {
    let ctx = bgNoiseCanvas.getContext("2d");
    let width = bgNoiseCanvas.width;
    let height = bgNoiseCanvas.height;
    let imageData = ctx.createImageData(width, height);
    let buffer = new Uint32Array(imageData.data.buffer);

    for (let i = 0; i < buffer.length; i++) {
        let value = Math.random() < 0.5 ? 0 : 1; // Generate 0 or 1
        let color = value * 255; // Convert 1 to 255, 0 remains 0
        buffer[i] = (255 << 24) | // alpha
                    (color << 16) | // red
                    (color << 8) |  // green
                    (color);        // blue
    }

    if(!mouseDownBool) {
        ctx.putImageData(imageData, 0, 0);
    }
}

function updateNoise() {
    generateNoise();
    requestAnimationFrame(updateNoise);
}

// function - navigation
function setNavColor(e) {
    navElements.forEach((element) => {
        element.style.color = navBaseColor;
    });
    e.style.color = navSelectedColor;
}

function setNavSelection() { // reposition selection. used for selection change and resize
    navSelector.style.width = navElements[navActive].offsetWidth + "px";
    navSelector.style.left = navElements[navActive].getBoundingClientRect().left + "px";
    setNavColor(navElements[navActive]);
}

function setNavActive(eIndex) { // handle selection change
    navActive = eIndex;
    setNavColor(navElements[navActive]);
    setNavSelection();
}

function handleNavHover(event) {
    navSelector.style.width = event.target.offsetWidth + "px";
    navSelector.style.left = event.target.getBoundingClientRect().left + "px";
    setNavColor(event.target);
}

function handleNavClick(event) {
    navElements.forEach((element, index) => {
        if (element === event.target) { // check index in array
            if (index !== navActive) {
                setNavActive(index);
            }
            // handle scrolling to element
            navScrolling = true; // prevent scroll event from changing selection
            window.scrollTo({
                top: sections[index].getBoundingClientRect().top + scrollPos - 80,
                behavior: 'smooth'
            });
            // reset scrolling
            window.addEventListener('scroll', function() {
                if (index == 0) {
                    if (navScrolling && window.scrollY === sections[index].getBoundingClientRect().top + scrollPos) {
                        navScrolling = false;
                    }
                } else {
                    if (navScrolling && window.scrollY === sections[index].getBoundingClientRect().top + scrollPos - 80) {
                        navScrolling = false;
                    }
                }
            });
        }
    });
}

function handleNavScroll() {
    if (!navScrolling) {
        sections.forEach((element, index) => {
            if (scrollPos > element.offsetTop - (screenHeight / 3 * 2) && scrollPos < element.offsetTop + element.offsetHeight - (screenHeight / 3 * 2)) {
                setNavActive(index);
            }
        })
    }
}

// function - unknown life
function initialCanvas() {
    canvasContainerUnknownLife.style.height = 0.7777777777777777 * canvasContainerUnknownLife.offsetWidth + "px";
}

function initialButtonUnknownLife() {
    buttonUnknownLife.style.opacity = "0";
    setTimeout(() => {
        buttonUnknownLife.style.width = "auto";
        buttonUnknownLife.style.position = "absolute";
        buttonUnknownLife.style.top = "0";
        buttonUnknownLife.style.left = "0";
    }, 400);
}

function unknownLifeMouseMove(event) {
    let mouseX = event.clientX - sectionUnknownLife.getBoundingClientRect().left;
    let mouseY = event.clientY - sectionUnknownLife.getBoundingClientRect().top;
    let buttonWidth = buttonUnknownLife.offsetWidth;
    let buttonHeight = buttonUnknownLife.offsetHeight;
    let bounderies = 20;

    if (mouseX + (buttonWidth / 2 + bounderies) > sectionUnknownLife.offsetWidth) {
        mouseX = sectionUnknownLife.offsetWidth - (buttonWidth / 2 + bounderies);
    } else if (mouseX - (buttonWidth / 2 + bounderies) < 0) {
        mouseX = buttonWidth / 2 + bounderies;
    }
    if (mouseY + (buttonHeight / 2 + bounderies) > sectionUnknownLife.offsetHeight) {
        mouseY = sectionUnknownLife.offsetHeight - (buttonHeight / 2 + bounderies);
    } else if (mouseY - (buttonHeight / 2 + bounderies) < 0) {
        mouseY = buttonHeight / 2 + bounderies;
    }

    buttonUnknownLife.style.opacity = "1";
    buttonUnknownLife.style.left = mouseX - (buttonWidth / 2) + 'px';
    buttonUnknownLife.style.top = mouseY - (buttonHeight / 2) + 'px';
}

function unknownLifeMouseLeave() {
    buttonUnknownLife.style.opacity = "0";
}

function unknownLifeClickHandler() {
    let maxNumber = dataUnknownLife.length - 1;
    let randomNumber;
  
    do {
        randomNumber = Math.floor(Math.random() * (maxNumber + 1));
    } while (createdImagesUnknownLife.includes(randomNumber));
  
    createdImagesUnknownLife.push(randomNumber);
    
    if (createdImagesUnknownLife.length > 10) {
        createdImagesUnknownLife.shift();
    }

    imgUnknownLife.src = "assets/images/" + dataUnknownLife[randomNumber].image;
    promptContainerUnknownLife.style.opacity = "0";

    setTimeout(unknownLifeChangePrompt(randomNumber), 600);
}

function unknownLifeChangePrompt(index) {
    promptContainerUnknownLife.style.opacity = "1";
    let prompt = promptContainerUnknownLife.querySelector("p");
    prompt.innerHTML = dataUnknownLife[index].text;
}

function unknownLifeimageLoaded() {
    canvasUnknownLife.width = imgUnknownLife.width;
    canvasUnknownLife.height = imgUnknownLife.height;

    canvasUnknownLife.style.animation = 'none';
    void canvasUnknownLife.offsetWidth;
    canvasUnknownLife.style.animation = null;

    ctxUnknownLife.drawImage(imgUnknownLife, 0, 0);

    let originalImageData = ctxUnknownLife.getImageData( 0, 0, canvasUnknownLife.width, canvasUnknownLife.height);
    let originalData = originalImageData.data;

    let randomizedPixels = Array.from(originalData);
    let indices = [];
    for (let i = 0; i < originalData.length / 4; i++) {
        indices.push(i);
    }

    // Shuffle indices
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffle(indices);

    // Randomize the pixel positions based on shuffled indices
    let randomizedData = new Uint8ClampedArray(originalData.length);
    for (let i = 0; i < indices.length; i++) {
        let srcIdx = indices[i] * 4;
        let destIdx = i * 4;
        randomizedData[destIdx] = originalData[srcIdx];
        randomizedData[destIdx + 1] = originalData[srcIdx + 1];
        randomizedData[destIdx + 2] = originalData[srcIdx + 2];
        randomizedData[destIdx + 3] = originalData[srcIdx + 3];
    }

    // Put the randomized pixels on the canvas
    ctxUnknownLife.putImageData(new ImageData(randomizedData, canvasUnknownLife.width, canvasUnknownLife.height), 0, 0);

    // Transition function to gradually sort pixels back to the original
    function transitionPixels(duration) {
        let startTime = Date.now();
        let totalPixels = indices.length;

        function transition() {
            let elapsedTime = Date.now() - startTime;
            let progress = Math.min(1, elapsedTime / duration);
            let numPixelsToSort = Math.floor(progress * totalPixels);

            // Copy a sorted subset of the pixels back to their original positions
            for (let i = 0; i < numPixelsToSort; i++) {
                let sortedIdx = indices[i] * 4;
                let destIdx = indices[i] * 4;
                randomizedData[destIdx] = originalData[sortedIdx];
                randomizedData[destIdx + 1] = originalData[sortedIdx + 1];
                randomizedData[destIdx + 2] = originalData[sortedIdx + 2];
                randomizedData[destIdx + 3] = originalData[sortedIdx + 3];
            }

            ctxUnknownLife.putImageData(
                new ImageData(randomizedData, canvasUnknownLife.width, canvasUnknownLife.height),
                0,
                0
            );

            if (progress < 1) {
                requestAnimationFrame(transition);
            }
        }
        requestAnimationFrame(transition);
    }
    transitionPixels(3000); // 3 seconds
}
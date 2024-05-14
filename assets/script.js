// var
// var - sizing and positioning
let screenWidth = document.documentElement.clientWidth || window.innerWidth;
let screenHeight = document.documentElement.clientHeight || window.innerHeight;
let scrollPos = window.scrollY || window.pageYOffset;
// var - navigation
let navElements;
let navSelector;
let navActive = 0;
let navSelectedColor = "hsl(120, 10%, 10%)";
let navBaseColor = "hsl(120, 3%, 60%)";
let navScrolling = false;
// var - sections
let sections;

// on load
document.addEventListener('DOMContentLoaded', function () {
    // get elements
    navElements = document.querySelector("nav").querySelectorAll(":nth-child(-n+3)");
    navSelector = document.getElementById("selection");
    // get sections
    sections = document.querySelectorAll(".nav-section");

    // event listeners
    navElements.forEach(function(element) {
        element.addEventListener("click", handleNavClick);
        element.addEventListener("mouseenter", handleNavHover);
        element.addEventListener("mouseleave", setNavSelection);
    });

    // function calls
    startup();
    setNavSelection();
});

// on resize
window.addEventListener("resize", function() {
    // update screen width and height
    screenWidth = document.documentElement.clientWidth || window.innerWidth;
    screenHeight = document.documentElement.clientHeight || window.innerHeight;

    // function calls
    setNavSelection();
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
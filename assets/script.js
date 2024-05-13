// var
let pageWidth = document.documentElement.clientWidth || window.innerWidth;
let pageHeight = document.documentElement.clientHeight || window.innerHeight;
let scrollY = window.scrollY || window.pageYOffset;

// on load
document.addEventListener('DOMContentLoaded', function () {

});

// on resize
window.addEventListener("resize", function() {
    pageWidth = document.documentElement.clientWidth || window.innerWidth;
    pageHeight = document.documentElement.clientHeight || window.innerHeight;
});

// on scroll
window.addEventListener("scroll", function() {
    scrollY = window.scrollY || window.pageYOffset;
});

// functions

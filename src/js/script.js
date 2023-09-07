//menu

const menuBtn = document.querySelector(".header__button-bar");
const menu = document.querySelector(".header__menu-container");

menuBtn.addEventListener("click", () => {
    if (menu.style.display === "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
})

//header
const header = document.querySelector(".header");
const main = document.querySelector("main");

document.addEventListener("scroll", () => {
    if(window.scrollY >= 300) {
        header.style.backgroundColor = "#ffffff";
    }
    if(window.scrollY <= 300) {
        header.style.backgroundColor = "#f8f8f8";
    }
})

//input runner
const inputSum = document.getElementById("sum");
const sumRunner = document.querySelector(".sumRunner");

const inputPeriod = document.getElementById("period");
const periodRunner = document.querySelector(".periodRunner");

//fields filled from calculator
const chosenSum = document.getElementById("chosen-sum");
const chosenPeriod = document.getElementById("chosen-period");

const sumToReturn = document.getElementById("return-sum");
const dateToReturn = document.getElementById("return-date");

function setWidth(input, runner) {
    const inputWidth = input.offsetWidth;
    const inputValue = input.value;
    const runnerWidth = (inputWidth / (+input.max - +input.min)) * (+inputValue  - +input.min) + "px";
    runner.style.width = runnerWidth;
}

function setDigit(num) {
    return String(num).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");
}

//sum to return
function calculateSum(initSum, period) {
    
    const sum = Math.ceil(+initSum.value * 0.00095 * +period.value) + +initSum.value;
    return sum;
}

function getReturnDate(input) {
    const current = Date.now() + +input.value * 24 * 60 * 60 * 1000;
    const date = new Date(current);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dateToReturn = day + "." + month + "." + year;

    return dateToReturn;
}
document.addEventListener("DOMContentLoaded", () => {
    setWidth(inputSum, sumRunner);
    setWidth(inputPeriod, periodRunner);
});
window.addEventListener("resize", () => {
    setWidth(inputSum, sumRunner);
    setWidth(inputPeriod, periodRunner);
});

inputSum.addEventListener("input", () => {
    setWidth(inputSum, sumRunner);
    
    //chosen sum
    chosenSum.textContent = setDigit(inputSum.value);
    //sum to return
    sumToReturn.textContent = setDigit(calculateSum(inputSum, inputPeriod));

});

inputPeriod.addEventListener("input", () => {
    setWidth(inputPeriod, periodRunner);
    chosenPeriod.textContent = inputPeriod.value;
    
    dateToReturn.textContent = getReturnDate(inputPeriod);
    sumToReturn.textContent = setDigit(calculateSum(inputSum, inputPeriod));
});


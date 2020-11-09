let numbers = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operators');
let displayValue = document.querySelector('.current-nums');
let addition = document.getElementById('add');
let subtraction = document.getElementById('subtract');
let multiplication = document.getElementById('multiply');
let division = document.getElementById('divide');
let equals = document.getElementById('equals');
let allClear = document.getElementById('ac');
let clear = document.getElementById('clear');
let firstNum;
let secondNum;

displayValue.innerText = 0;

//math operators
function add (x,y) {
    return x + y;
}

function subtract (x,y) {
    return x - y;
}

function multiply (x,y) {
    return x * y;
}

function divide (x,y) {
    return x / y;
}

//operate
function operate(operator,x,y) {
    if (operator === addition) {
        return add(x,y);
    } else if (operator === subtraction) {
        return subtract(x,y);
    } else if (operator === multiplication) {
        return multiply(x,y);
    } else {
        return divide(x,y);
    }
}

operate();


for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function(e) {
        displayValue.innerText = 0;
        displayValue.innerText = this.textContent;
        firstNum = displayValue.innerText;
        console.log(firstNum);
    });
}

allClear.addEventListener('click', function(e) {
    displayValue.innerText = 0;
    firstNum = displayValue.innerText;
    console.log(firstNum);
})
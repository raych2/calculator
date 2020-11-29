const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const displayValue = document.querySelector('.current-nums');
const equals = document.getElementById('equals');
const allClear = document.getElementById('ac');
const clear = document.getElementById('clear');
const decimal = document.getElementById('decimal');
const sign = document.getElementById('sign');

let firstNum = '';
let secondNum = '';
let operator = '';
let totalValue = '';

//Enable or disable calculator buttons
let numbersEnabled = true;
let operatorsEnabled = false;
let signEnabled = true;
let decimalEnabled = false;
let clearEnabled = false;

//Math operators
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
    return (x / y);
}

function operate(operator,x,y) {
    x = Number(x);
    y = Number(y);
    if (isNaN(x) || isNaN(y)) {
        numbersEnabled = false;
        return 'ERROR!';
    }
    if (operator === '+') {
        return add(x,y);
    } else if (operator === '-') {
        return subtract(x,y);
    } else if (operator === '*') {
        return multiply(x,y);
    } else if (operator === '/' && (x === 0 || y === 0)) {
        return "Nice try!";
    } else {
        return divide(x,y);
    }
}


//Any clicked number buttons will populate the display
function updateDisplay(e) {
    //Add limit to prevent overflow of numbers and any addition to the limit message
    if (displayValue.textContent.length > 12) {
        displayValue.textContent = "—SCREEN LIMIT—";
        numbersEnabled = false;
        operatorsEnabled = false;
        signEnabled = false;
        decimalEnabled = false;
        clearEnabled = false;
        return;
    }
    if (numbersEnabled) {
        displayValue.innerText = '';
        displayValue.innerText += e.target.textContent;
        numbersEnabled = false;
        operatorsEnabled = true;
        decimalEnabled = true;
        signEnabled = true;
        clearEnabled = true;
    } else if (displayValue.innerText !== "—SCREEN LIMIT—" || displayValue.innerText !== "ERROR!" || displayValue.innerText !== "NaN"){
        displayValue.innerText += e.target.textContent;
        numbersEnabled = false;
        decimalEnabled = true;
        signEnabled = true;
        clearEnabled = true;
    } 
}


//Assign values and operators to variables according to the display
function getOperator(e) {
    if (operatorsEnabled) {
        if (firstNum === '') {
            operator = e.target.textContent;
            operatorsEnabled = false;
            clearEnabled = false;
            firstNum = displayValue.innerText;
            //Display current equation in calculator
            displayValue.innerText = `${firstNum} ${operator}`;
            numbersEnabled = true;
        } else {
            secondNum = displayValue.innerText;
            totalValue = operate(operator, firstNum, secondNum);
            operator = e.target.textContent;
            operatorsEnabled = false;
            firstNum = totalValue;
            displayValue.innerText = `${totalValue} ${operator}`;
            numbersEnabled = true;
        }
    }
}

function solveEquation() {
    if (firstNum !== '' && secondNum !== "—SCREEN LIMIT—") {
        secondNum = displayValue.innerText;
        totalValue = operate(operator, firstNum, secondNum);
        //Prevent overflow of display
        if (totalValue.toString().length >= 10) {
            displayValue.innerText = totalValue.toPrecision(5);
        } else {
            displayValue.innerText = totalValue;
        }
        firstNum = '';
        secondNum = '';
        signEnabled = true;
        numbersEnabled = true;
        clearEnabled = false;
        decimalEnabled = false;
    }
}

function clearAllValues() {
    firstNum = '';
    secondNum = '';
    operator = '';
    totalValue = '';
    displayValue.innerText = '0';
    numbersEnabled = true;
    operatorsEnabled = false;
    signEnabled = true;
    decimalEnabled = true;
    clearEnabled = true;
}

function clearMostRecentVal() {
    if (clearEnabled) {
        displayValue.innerText = displayValue.innerText.slice(0,-1);
    }
}

function addDecimal() {
    if (decimalEnabled && !displayValue.innerText.includes('.')) {
        displayValue.innerText += '.';
        decimalEnabled = false;
    }
}

function changeSign() {
    if (signEnabled) {
        if (displayValue.innerText !== '') {
            let negativeNum = displayValue.innerText;
            negativeNum = negativeNum * -1;
            displayValue.innerText = negativeNum;
        } 
    }
}

numbers.forEach(num => {
    num.addEventListener('click', updateDisplay);
       
});

operators.forEach(op => {
    op.addEventListener('click', getOperator);
});

equals.addEventListener('click', solveEquation); 
allClear.addEventListener('click', clearAllValues);
clear.addEventListener('click', clearMostRecentVal);
decimal.addEventListener('click', addDecimal);
sign.addEventListener('click', changeSign);
let numbers = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operators');
let displayValue = document.querySelector('.current-nums');
let equals = document.getElementById('equals');
let allClear = document.getElementById('ac');
let clear = document.getElementById('clear');

let currentNum = '';
let previousNum = '';
let operator = '';
let totalValue = 0;

displayValue.innerText = '';

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
    if (operator === '+') {
        return add(x,y);
    } else if (operator === '-') {
        return subtract(x,y);
    } else if (operator === '*') {
        return multiply(x,y);
    } else {
        return divide(x,y);
    }
}

numbers.forEach(num => {
    num.addEventListener('click', function(e) {
        if (operator === '') {
            displayValue.innerText += num.textContent;
            currentNum = +(displayValue.innerText);
        } else if (previousNum) {
            displayValue.innerText += num.textContent;
            currentNum = +(displayValue.innerText);
        }
    });
});

operators.forEach(op => {
    op.addEventListener('click', function(e) {
        if (op.id !== 'equals') {
            operator = op.textContent;
            previousNum = currentNum;
            currentNum = '';
            displayValue.innerText = '';
        }
    })
});

equals.addEventListener('click', function(e) {
    if (operator === '/' && currentNum === 0) {
        displayValue.innerText = 'Nice try!';
        return;
    }
    totalValue = operate(operator, previousNum, currentNum);
    displayValue.innerText = totalValue;
    currentNum = totalValue;
    operator = '';
});

allClear.addEventListener('click', function(e) {
    currentNum = '';
    previousNum = '';
    operator = '';
    displayValue.innerText = '';
});
let numbers = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operators');
let displayValue = document.querySelector('.current-nums');
let equals = document.getElementById('equals');
let allClear = document.getElementById('ac');
let clear = document.getElementById('clear');
let decimal = document.getElementById('decimal');
let sign = document.getElementById('sign');

let currentNum = '';
let previousNum = '';
let operator = '';
let totalValue = 0;

//enable/disable buttons
let numbersEnabled = true;
let operatorsEnabled = false;
let decimalEnabled = true;
let clearEnabled = true;

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
        if (numbersEnabled) {
            if (operator === '') {
                operatorsEnabled = true;
                displayValue.innerText += num.textContent;
                currentNum = +(displayValue.innerText);
            } else if (previousNum) {
                displayValue.innerText += num.textContent;
                currentNum = +(displayValue.innerText);
            } else {
                displayValue.innerText += num.textContent;
                currentNum = +(displayValue.innerText);
            }
        }
    });
});

operators.forEach(op => {
    op.addEventListener('click', function(e) {
        if (operatorsEnabled) {
            operator = op.textContent;
            previousNum = currentNum;
            currentNum = '';
            decimalEnabled = true;
            numbersEnabled = true;
            displayValue.innerText = '';
        } 
    })
});

equals.addEventListener('click', function(e) {
    if (operator === '/' && currentNum === 0) {
        displayValue.innerText = 'Nice try!';
        return;
    } else if (currentNum === totalValue) {
        numbersEnabled = false;
        return;
    }

    if (operator && previousNum && currentNum) {
        totalValue = operate(operator, previousNum, currentNum);
        numbersEnabled = false;
        if (totalValue.length > 8) {
            totalValue = totalValue.toFixed(8);
        }
        displayValue.innerText = totalValue;
        currentNum = totalValue;
        operator = '';
        clearEnabled = false;
    }
});

allClear.addEventListener('click', function(e) {
    currentNum = '';
    previousNum = '';
    operator = '';
    totalValue = 0;
    displayValue.innerText = '';
    decimalEnabled = true;
    numbersEnabled = true;
    clearEnabled = true;
});

clear.addEventListener('click', function(e) {
    if (clearEnabled) {
        displayValue.innerText = displayValue.innerText.slice(0,-1);
        currentNum = +(displayValue.innerText);
    }
});

decimal.addEventListener('click', function(e) {
    if (decimalEnabled) {
        displayValue.innerText += '.';
        decimalEnabled = false;
    }
})

sign.addEventListener('click', function(e) {
    if (displayValue.innerText !== '') {
        currentNum *= -1;
        displayValue.innerText = currentNum;
    }
})
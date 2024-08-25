const result = document.getElementById('result');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let currentOperator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9' || value === '.') {
            currentInput += value;
            updateDisplay();
        } else if (value === 'C') {
            clear();
        } else if (value === '=') {
            calculate();
        } else if (value === '⌫') {
            backspace();
        } else {
            handleOperator(value);
        }
    });
});

function updateDisplay() {
    result.value = currentInput;
}

function clear() {
    currentInput = '';
    currentOperator = '';
    previousInput = '';
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculate() {
    if (previousInput && currentOperator && currentInput) {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let calculatedResult;

        switch (currentOperator) {
            case '+':
                calculatedResult = prev + current;
                break;
            case '-':
                calculatedResult = prev - current;
                break;
            case '×':
                calculatedResult = prev * current;
                break;
            case '÷':
                calculatedResult = prev / current;
                break;
            case '%':
                calculatedResult = (prev / 100) * current;
                break;
        }

        currentInput = calculatedResult.toString();
        currentOperator = '';
        previousInput = '';
        updateDisplay();
    }
}

function handleOperator(operator) {
    if (currentInput !== '') {
        if (previousInput !== '') {
            calculate();
        }
        previousInput = currentInput;
        currentInput = '';
        currentOperator = operator;
    }
}
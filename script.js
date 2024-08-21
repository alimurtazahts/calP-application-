function appendNumber(number) {
    const screen = document.getElementById('screen');
    screen.value += number;
}

function appendOperator(operator) {
    const screen = document.getElementById('screen');
    const lastChar = screen.value[screen.value.length - 1];
    
    if ("+-*/".includes(lastChar)) {
        screen.value = screen.value.slice(0, -1) + operator;
    } else {
        screen.value += operator;
    }
}

function clearScreen() {
    document.getElementById('screen').value = '';
}

function calculate() {
    const screen = document.getElementById('screen');
    try {
        screen.value = eval(screen.value);
    } catch (e) {
        screen.value = 'Error';
    }
}

document.addEventListener('DOMContentLoaded', () => {
   
    const resultDisplay = document.getElementById('result');
    const historyDisplay = document.getElementById('history');
    const historyList = document.getElementById('calculation-history-list');
    const buttons = document.querySelector('.buttons');
    const memoryButtons = document.querySelector('.memory-container');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    
   
    const historyToggleBtn = document.getElementById('history-toggle-btn');
    const historyOverlay = document.getElementById('history-overlay');

    
    let currentInput = '0';
    let fullExpression = '';
    let isNewOperation = true; 
    let memoryValue = 0;
    let calculationHistory = [];
    const MAX_HISTORY = 5;

    
    const evaluateExpression = (expression) => {
       
        let formula = expression.replace(/×/g, '*').replace(/÷/g, '/');

        try {
           
            if (formula.includes('/ 0')) {
                return 'Error: Dibagi 0';
            }
            
            let result = eval(formula);
            
            if (isNaN(result) || !isFinite(result)) {
                return 'Error';
            }
            
            return Number(result.toFixed(10)).toString();
        } catch (e) {
            return 'Error';
        }
    };

   
    const updateDisplay = () => {
        const maxLen = 15;
        let displayedValue = currentInput.length > maxLen ? 
                             parseFloat(currentInput).toExponential(5) : 
                             currentInput;

        resultDisplay.value = displayedValue;
        historyDisplay.textContent = fullExpression;
    };

    const updateHistoryLog = (expression, result) => {
        const historyItem = `${expression} = ${result}`;
        
        calculationHistory.push(historyItem);
        
        if (calculationHistory.length > MAX_HISTORY) {
            calculationHistory.shift();
        }

        historyList.innerHTML = '';
       
        [...calculationHistory].reverse().forEach(item => { 
            const li = document.createElement('li');
            li.textContent = item;
            historyList.appendChild(li);
        });
    };

    
    const clearCalculationHistory = () => {
        calculationHistory = []; 
        historyList.innerHTML = ''; 
    };

    const deleteLastDigit = () => {
        if (currentInput === 'Error') {
            currentInput = '0';
            fullExpression = '';
            isNewOperation = true;
            return;
        }

        if (isNewOperation) {
            const lastChar = fullExpression.trim().slice(-1);
            if (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') {
                fullExpression = fullExpression.trim().slice(0, -1).trim();
                
                const tokens = fullExpression.split(' ');
                currentInput = tokens[tokens.length - 1] || '0'; 
                isNewOperation = false;
                return;
            }
        }
        
        currentInput = currentInput.slice(0, -1);
        
        if (currentInput.length === 0) {
            currentInput = '0';
            isNewOperation = true;
        }
        
        const tokens = fullExpression.trim().split(' ');
        const lastToken = tokens[tokens.length - 1];

        if (!isNaN(parseFloat(lastToken))) {
            const index = fullExpression.lastIndexOf(lastToken);
            if (index !== -1) {
                fullExpression = fullExpression.substring(0, index) + currentInput;
            } else {
                fullExpression = currentInput;
            }
        }
        
        if (fullExpression === '0') {
             fullExpression = '';
        }
        fullExpression = fullExpression.trim();
    };

    buttons.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.classList.contains('btn')) return;

        const num = target.dataset.num;
        const op = target.dataset.op;
        const action = target.dataset.action;

        if (num !== undefined) {
            if (currentInput === 'Error' || isNewOperation) {
                currentInput = num;
                isNewOperation = false;
            } else {
                if (currentInput.length < 20) {
                     currentInput += num;
                }
            }
            
            const tokens = fullExpression.trim().split(' ');
            const lastToken = tokens[tokens.length - 1];

            if (tokens.length === 0 || isNaN(parseFloat(lastToken)) || lastToken.endsWith(' ')) {
                fullExpression = fullExpression.trim() + ' ' + currentInput;
            } else {
                const index = fullExpression.lastIndexOf(lastToken);
                if (index !== -1) {
                    fullExpression = fullExpression.substring(0, index) + currentInput;
                } else {
                    fullExpression = currentInput;
                }
            }
            fullExpression = fullExpression.trim();
        } 
        
        else if (action === '.') {
            if (currentInput === 'Error' || isNewOperation) {
                currentInput = '0.';
                isNewOperation = false;
            } else if (!currentInput.includes('.')) {
                currentInput += '.';
            }
        } 
        
        else if (op !== undefined) {
            if (currentInput === 'Error') {
                currentInput = '0';
                fullExpression = '';
            }

            const lastChar = fullExpression.trim().slice(-1);
            if (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') {
                fullExpression = fullExpression.trim().slice(0, -1) + ` ${op}`;
            } else {
                fullExpression = fullExpression.trim() + ` ${op}`;
            }
            
            isNewOperation = true; 
        } 
        
        else if (action !== undefined) {
            if (action === 'C') { 
                currentInput = '0';
                fullExpression = '';
                isNewOperation = true;
            } else if (action === 'DEL') { 
                deleteLastDigit();
            } else if (action === '=') {
                if (fullExpression === '') return;
                
                let expressionToEvaluate = fullExpression.trim();

                const lastChar = expressionToEvaluate.slice(-1);
                if (lastChar === '+' || lastChar === '-' || lastChar === '×' || lastChar === '÷') {
                    expressionToEvaluate = expressionToEvaluate.slice(0, -1);
                }

                const result = evaluateExpression(expressionToEvaluate);

                if (!result.startsWith('Error')) {
                    updateHistoryLog(expressionToEvaluate, result);
                }

                currentInput = result;
                fullExpression = `${result}`; 
                isNewOperation = true; 
            }
        }

        updateDisplay();
    });


    memoryButtons.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.classList.contains('memory-btn')) return;

        const action = target.dataset.action;
        const currentValue = parseFloat(currentInput); 

        if (currentInput === 'Error') return;

        switch (action) {
            case 'MC': 
                memoryValue = 0; 
                
            
                if (isNewOperation || fullExpression === '') {
                    currentInput = '0';
                    fullExpression = '';
                }
                break;
                
            case 'MR': 
                currentInput = memoryValue.toString();
                fullExpression = currentInput; 
                partialResult = null;
                isNewOperation = true;
                break;
                
            case 'M+': 
                memoryValue += currentValue;
                
                currentInput = memoryValue.toString(); 
                isNewOperation = true; 
                partialResult = null;
                break;
                
            case 'M-': 
                memoryValue -= currentValue;
                
                currentInput = memoryValue.toString(); 
                isNewOperation = true; 
                partialResult = null;
                break;
        }

        updateDisplay();
    });

    historyToggleBtn.addEventListener('click', () => {
        historyOverlay.classList.toggle('active');
    });

    clearHistoryBtn.addEventListener('click', clearCalculationHistory);


    document.addEventListener('keydown', (event) => {
        const key = event.key;

        let targetButton = null;

        if (key >= '0' && key <= '9') {
            targetButton = document.querySelector(`.number-btn[data-num="${key}"]`);
        } else if (key === '+') {
            targetButton = document.querySelector(`.operator-btn[data-op="+"]`);
        } else if (key === '-') {
            targetButton = document.querySelector(`.operator-btn[data-op="-"]`);
        } else if (key === '*' || key === 'x') {
            targetButton = document.querySelector(`.operator-btn[data-op="×"]`);
        } else if (key === '/') {
            targetButton = document.querySelector(`.operator-btn[data-op="÷"]`);
        } else if (key === 'Enter' || key === '=') {
            targetButton = document.querySelector(`.equals-btn[data-action="="]`);
            event.preventDefault(); 
        } else if (key === '.') {
            targetButton = document.querySelector(`.decimal-btn[data-action="."]`);
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            targetButton = document.querySelector(`.function-btn[data-action="C"]`);
        } else if (key === 'Backspace') {
             deleteLastDigit();
             event.preventDefault(); 
             updateDisplay();
             return; 
        }

        if (targetButton) {
            targetButton.click();
        }
    });
    
    updateDisplay();
});
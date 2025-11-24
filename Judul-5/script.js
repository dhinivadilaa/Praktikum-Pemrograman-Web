// script.js
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement, historyListElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.historyListElement = historyListElement; 
        this.history = []; 
        this.memory = 0;   
        this.clear();
    }

    // --- Fungsi Dasar (Sama seperti sebelumnya) ---
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
        this.updateHistoryDisplay();
    }

    clearEntry() {
        this.currentOperand = '0';
    }

    delete() { 
        if (this.currentOperand === "Error: Division by zero") {
            this.clear();
            return;
        }
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }

    appendNumber(number) {
        if (this.currentOperand === "Error: Division by zero") {
            this.currentOperand = number; 
            return;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === "Error: Division by zero") return;
        if (this.currentOperand === '') return;

        if (this.previousOperand !== '') {
            this.calculate(); 
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand; 
        this.currentOperand = '';
    }

    calculate() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        let calculationString = `${this.previousOperand} ${this.operation} ${this.currentOperand}`;

        switch (this.operation) {
            case '+':
            case '-':
            case '×':
                // ... (Logika sama)
                result = this.operation === '+' ? prev + current : 
                         this.operation === '-' ? prev - current : prev * current;
                break;
            case '÷':
                if (current === 0) {
                    this.currentOperand = "Error: Division by zero";
                    this.previousOperand = '';
                    this.operation = undefined;
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        this.addHistory(`${calculationString} = ${result}`);

        this.currentOperand = result.toString();
        this.operation = undefined;
        this.previousOperand = '';
        
        this.updateHistoryDisplay(); // Perbarui tampilan history setelah perhitungan
    }

    // --- Advanced Features ---
    addHistory(calculation) {
        this.history.unshift(calculation); 
        if (this.history.length > 5) {
            this.history.pop(); 
        }
    }

    updateHistoryDisplay() {
        this.historyListElement.innerHTML = ''; 

        this.history.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerText = item;
            // FITUR BARU: Tambahkan event listener agar item history bisa dipencet
            listItem.addEventListener('click', () => {
                this.loadHistoryItem(item);
            });
            this.historyListElement.appendChild(listItem);
        });
    }

    loadHistoryItem(item) {
        // Logika untuk memuat hasil perhitungan kembali ke display
        // Misalnya, mengambil hasil (angka setelah '=') dan memuatnya ke currentOperand
        const resultMatch = item.match(/=\s*(-?\d+(\.\d+)?)$/);
        if (resultMatch) {
            this.currentOperand = resultMatch[1];
            this.previousOperand = '';
            this.operation = undefined;
            this.updateDisplay();
            // Opsional: Sembunyikan drawer setelah memuat
            document.getElementById('history-drawer').classList.remove('active'); 
        }
    }

    memoryFunction(action) {
        const currentVal = parseFloat(this.currentOperand);
        // ... (Logika Memory sama seperti sebelumnya)
        switch (action) {
            case 'm-plus': 
                if (!isNaN(currentVal)) { this.memory += currentVal; }
                break;
            case 'm-minus': 
                if (!isNaN(currentVal)) { this.memory -= currentVal; }
                break;
            case 'm-read': 
                if (this.currentOperand !== "Error: Division by zero") {
                    this.currentOperand = this.memory.toString();
                }
                break;
            case 'm-clear': 
                this.memory = 0;
                break;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// --- Event Listeners dan Inisialisasi ---
const numberButtons = document.querySelectorAll('[data-value]:not([data-action])');
const operatorButtons = document.querySelectorAll('[data-action="operator"]');
const equalsButton = document.querySelector('[data-action="equals"]');
const clearButton = document.querySelector('[data-action="clear"]');
const clearEntryButton = document.querySelector('[data-action="clear-entry"]');
const backspaceButton = document.querySelector('[data-action="backspace"]');
const memoryButtons = document.querySelectorAll('[data-action="m-clear"], [data-action="m-read"], [data-action="m-plus"], [data-action="m-minus"]');
const historyToggleButton = document.getElementById('history-toggle'); // Tombol Ikon
const historyDrawerElement = document.getElementById('history-drawer'); // Kontainer History

const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');
const historyListElement = document.getElementById('history-list');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, historyListElement);

// Menghubungkan fungsi toggle history
historyToggleButton.addEventListener('click', () => {
    historyDrawerElement.classList.toggle('active');
});


// ... (Event Listeners lainnya untuk tombol angka, operator, equals, C, CE, DEL, Memory) ...
// (Semua event listeners di bagian ini tetap sama, hanya memanggil method dari instance calculator)

numberButtons.forEach(button => {
    button.addEventListener('click', () => { calculator.appendNumber(button.innerText); calculator.updateDisplay(); });
});
operatorButtons.forEach(button => {
    button.addEventListener('click', () => { calculator.chooseOperation(button.innerText); calculator.updateDisplay(); });
});
equalsButton.addEventListener('click', () => {
    calculator.calculate(); calculator.updateDisplay(); 
});
clearButton.addEventListener('click', () => {
    calculator.clear(); 
});
clearEntryButton.addEventListener('click', () => {
    calculator.clearEntry(); calculator.updateDisplay(); 
});
backspaceButton.addEventListener('click', () => {
    calculator.delete(); calculator.updateDisplay(); 
});
memoryButtons.forEach(button => {
    button.addEventListener('click', () => { calculator.memoryFunction(button.dataset.action); calculator.updateDisplay(); });
});


// Keyboard Support (Sama seperti sebelumnya)
document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (key >= '0' && key <= '9') { calculator.appendNumber(key); } 
    else if (key === '+' || key === '-' || key === '*' || key === '/') { 
        let displayOp = key === '*' ? '×' : key === '/' ? '÷' : key;
        calculator.chooseOperation(displayOp);
    } 
    else if (key === 'Enter' || key === '=') { 
        e.preventDefault(); 
        calculator.calculate();
    }
    else if (key === '.') { calculator.appendNumber('.'); }
    else if (key === 'Escape') { calculator.clear(); }
    else if (key === 'Backspace') { calculator.delete(); }

    calculator.updateDisplay();
});

// Tampilkan 0 dan update history kosong saat startup
calculator.updateDisplay();
calculator.updateHistoryDisplay();
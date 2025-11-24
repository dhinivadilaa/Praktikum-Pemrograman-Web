// script.js
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement, historyListElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.historyListElement = historyListElement; // Elemen DOM History
        this.history = []; // History perhitungan (5 terakhir)
        this.memory = 0;   // Memory value
        this.clear();
    }

    // --- Fungsi Dasar ---
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay(); // Panggil updateDisplay untuk memastikan tampilan bersih
        this.updateHistoryDisplay(); // Panggil updateHistoryDisplay
    }

    clearEntry() {
        this.currentOperand = '0';
    }

    delete() { // Fungsi baru untuk Backspace
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
            this.currentOperand = number; // Mulai input baru setelah error
            return;
        }
        // Mencegah dua titik desimal
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        // Menghapus '0' awal jika input pertama bukan '.'
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
            // Untuk perhitungan berantai: 5 + 3 x
            this.calculate(); 
        }

        this.operation = operation;
        // Pindah currentOperand ke previousOperand
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
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                // Penanganan Error: Pembagian dengan nol
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

        // Tambahkan ke History
        this.addHistory(`${calculationString} = ${result}`);

        this.currentOperand = result.toString();
        this.operation = undefined;
        this.previousOperand = '';
        
        this.updateHistoryDisplay(); // Panggil di sini!
    }

    // --- Advanced Features ---
    addHistory(calculation) {
        this.history.unshift(calculation); // Tambahkan di awal
        if (this.history.length > 5) {
            this.history.pop(); // Pertahankan 5 perhitungan terakhir
        }
    }

    updateHistoryDisplay() { // METHOD BARU UNTUK DISPLAY HISTORY
        this.historyListElement.innerHTML = ''; // Kosongkan daftar

        this.history.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerText = item;
            this.historyListElement.appendChild(listItem);
        });
    }

    memoryFunction(action) {
        const currentVal = parseFloat(this.currentOperand);

        switch (action) {
            case 'm-plus': // M+
                if (!isNaN(currentVal)) {
                    this.memory += currentVal;
                }
                break;
            case 'm-minus': // M-
                if (!isNaN(currentVal)) {
                    this.memory -= currentVal;
                }
                break;
            case 'm-read': // MR
                // Pastikan MR tidak menimpa error message
                if (this.currentOperand !== "Error: Division by zero") {
                    this.currentOperand = this.memory.toString();
                }
                break;
            case 'm-clear': // MC
                this.memory = 0;
                break;
        }
    }

    // --- Update UI ---
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

// --- Event Listeners (Menghubungkan JS dengan HTML) ---
const numberButtons = document.querySelectorAll('[data-value]:not([data-action])');
const operatorButtons = document.querySelectorAll('[data-action="operator"]');
const equalsButton = document.querySelector('[data-action="equals"]');
const clearButton = document.querySelector('[data-action="clear"]');
const clearEntryButton = document.querySelector('[data-action="clear-entry"]');
const backspaceButton = document.querySelector('[data-action="backspace"]'); // Tombol Backspace
const memoryButtons = document.querySelectorAll('.memory-buttons button');

const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');
const historyListElement = document.getElementById('history-list'); // Ambil elemen list history

// Kirim elemen history ke constructor Calculator
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, historyListElement);

// Tombol Angka dan Titik Desimal
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// Tombol Operator
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// Tombol Sama Dengan
equalsButton.addEventListener('click', button => {
    calculator.calculate();
    calculator.updateDisplay();
});

// Tombol C (Clear All)
clearButton.addEventListener('click', () => {
    calculator.clear();
});

// Tombol CE (Clear Entry)
clearEntryButton.addEventListener('click', () => {
    calculator.clearEntry();
    calculator.updateDisplay();
});

// Tombol Backspace (DEL)
backspaceButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});


// Memory Functions
memoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.memoryFunction(button.dataset.action);
        calculator.updateDisplay();
    });
});

// Keyboard Support
document.addEventListener('keydown', (e) => {
    const key = e.key;

    // Angka 0-9
    if (key >= '0' && key <= '9') {
        calculator.appendNumber(key);
    } 
    // Operator
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        // Menggunakan '*' sebagai '×' dan '/' sebagai '÷'
        let displayOp = key === '*' ? '×' : key === '/' ? '÷' : key;
        calculator.chooseOperation(displayOp);
    } 
    // Tombol Enter (=)
    else if (key === 'Enter' || key === '=') {
        e.preventDefault(); // Mencegah default action form
        calculator.calculate();
    }
    // Tombol Desimal
    else if (key === '.') {
        calculator.appendNumber('.');
    }
    // Tombol Escape (C)
    else if (key === 'Escape') {
        calculator.clear();
    }
    // Tombol Backspace (Menghapus digit terakhir)
    else if (key === 'Backspace') {
        calculator.delete();
    }

    calculator.updateDisplay();
});

// Tampilkan 0 dan update history kosong saat startup
calculator.updateDisplay();
calculator.updateHistoryDisplay();
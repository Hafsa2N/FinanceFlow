let transactions = [];

const form = document.getElementById('transactionForm');
const descInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const transactionsListDiv = document.getElementById('transactionsList');
const totalBalanceSpan = document.getElementById('totalBalance');
const totalIncomeSpan = document.getElementById('totalIncome');
const totalExpenseSpan = document.getElementById('totalExpense');
const clearAllBtn = document.getElementById('clearAllBtn');
const feedbackDiv = document.getElementById('formFeedback');

function loadTransactions() {
    const stored = localStorage.getItem('financeFlowTransactions');
    if (stored) {
        try {
            transactions = JSON.parse(stored);
        } catch(e) { transactions = []; }
    } else {
        transactions = [];  // start completely empty – no demo data
    }
    renderAll();
}

function saveToLocalStorage() {
    localStorage.setItem('financeFlowTransactions', JSON.stringify(transactions));
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function computeTotals() {
    let totalIncome = 0, totalExpense = 0;
    transactions.forEach(t => {
        if (t.type === 'income') totalIncome += t.amount;
        else totalExpense += t.amount;
    });
    return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
}

function updateSummary() {
    const { totalIncome, totalExpense, balance } = computeTotals();
    totalBalanceSpan.innerText = formatCurrency(balance);
    totalIncomeSpan.innerText = formatCurrency(totalIncome);
    totalExpenseSpan.innerText = formatCurrency(totalExpense);
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function renderTransactionsList() {
    if (!transactionsListDiv) return;
    if (transactions.length === 0) {
        transactionsListDiv.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-receipt"></i>
                <p>No transactions yet.<br>Add your first one above 👆</p>
            </div>
        `;
        return;
    }
    const sorted = [...transactions].sort((a,b) => new Date(b.date) - new Date(a.date));
    transactionsListDiv.innerHTML = sorted.map(t => {
        const isIncome = t.type === 'income';
        const sign = isIncome ? '+' : '-';
        const formattedDate = new Date(t.date).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });
        return `
            <div class="transaction-item" data-id="${t.id}">
                <div class="transaction-info">
                    <div class="transaction-desc">${escapeHtml(t.description)}</div>
                    <div class="transaction-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</div>
                </div>
                <div class="transaction-amount">
                    <span class="${isIncome ? 'income-amount' : 'expense-amount'}">${sign} ${formatCurrency(t.amount)}</span>
                    <button class="delete-btn" data-id="${t.id}"><i class="fas fa-trash-can"></i></button>
                </div>
            </div>
        `;
    }).join('');
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTransactionById(Number(btn.getAttribute('data-id')));
        });
    });
}

function deleteTransactionById(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveToLocalStorage();
    renderAll();
    showTemporaryFeedback('Transaction deleted', 'success');
}

function clearAllTransactions() {
    if (transactions.length > 0 && confirm('⚠️ Delete ALL transactions? This action cannot be undone.')) {
        transactions = [];
        saveToLocalStorage();
        renderAll();
        showTemporaryFeedback('All transactions cleared', 'success');
    }
}

function addTransaction(description, amount, type) {
    if (!description.trim()) {
        showTemporaryFeedback('Please enter a description', 'error');
        return false;
    }
    if (isNaN(amount) || amount <= 0) {
        showTemporaryFeedback('Please enter a valid positive amount', 'error');
        return false;
    }
    const newTransaction = {
        id: Date.now(),
        description: description.trim(),
        amount: parseFloat(amount),
        type: type,
        date: new Date().toISOString()
    };
    transactions.unshift(newTransaction);
    saveToLocalStorage();
    renderAll();
    showTemporaryFeedback(`${type === 'income' ? 'Income' : 'Expense'} added!`, 'success');
    return true;
}

function handleFormSubmit(e) {
    e.preventDefault();
    const description = descInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;
    if (addTransaction(description, amount, type)) {
        descInput.value = '';
        amountInput.value = '';
        typeSelect.value = 'expense';
        descInput.focus();
    }
}

let feedbackTimeout;
function showTemporaryFeedback(msg, type) {
    feedbackDiv.innerText = msg;
    feedbackDiv.className = `feedback-msg feedback-${type}`;
    if (feedbackTimeout) clearTimeout(feedbackTimeout);
    feedbackTimeout = setTimeout(() => {
        feedbackDiv.innerText = '';
        feedbackDiv.className = 'feedback-msg';
    }, 2500);
}

function renderAll() {
    updateSummary();
    renderTransactionsList();
}

function init() {
    loadTransactions();
    form.addEventListener('submit', handleFormSubmit);
    clearAllBtn.addEventListener('click', clearAllTransactions);
    amountInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleFormSubmit(e); });
}

init();
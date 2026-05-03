# 💰 FinanceFlow – Personal Expense Tracker

Track your income and expenses instantly. No sign‑up, no server – just your browser and your data.

## 📌 What is this?

FinanceFlow is a lightweight, client‑side web app that helps you monitor your personal finances. Every transaction is stored in your browser's local storage, so your data never leaves your device. Add income or expense entries, watch your balance update in real time, and manage your transaction history – all from a modern, responsive dashboard.

## ✨ Features

- ➕ **Quick transaction entry** – description, amount, and type (income/expense)  
- 📊 **Real‑time summary** – instantly see total balance, income, and expenses  
- 🗑️ **Delete individually** or **clear all** transactions with one click  
- 💾 **Persistent storage** – data stays even after refreshing or closing the browser  
- 📱 **Fully responsive** – works on desktop, tablet, and mobile devices  
- 🎨 **Glassmorphism UI** – clean, modern, and easy on the eyes

## 🧰 Tech Stack

**Layer**     **Technology**  

| Markup      | HTML5                                          
| Styling     | CSS3 (Flexbox, Grid, Glassmorphism)            
| Logic       | Vanilla JavaScript (ES6)                       
| Icons       | Font Awesome 6                                  
| Storage     | Browser LocalStorage API                        

💻 Usage
\\
**Add a transaction**
Enter a description (e.g., “Groceries”, “Freelance paycheck”) and an amount (>0).
Choose “Income” or “Expense” from the dropdown.
Click “Add transaction” – the summary and list update instantly.

**View your finances**
The three cards show Total Balance, Total Income, and Total Expenses.
Below, every transaction appears with a timestamp and a delete button.

**Manage transactions**
Click the 🗑️ icon next to any transaction to delete it.
Click “Clear all” to remove every transaction (confirmation required).

**Data persistence**
All entries are saved automatically in your browser's local storage.
Refresh the page or close the browser – your data will be there when you return.

🗺️ Future Roadmap
📅 Date picker – allow users to assign custom dates to transactions
📈 Spending charts – visual breakdown by category (pie/bar chart)
🏷️ Category tags – group expenses like “Food”, “Transport”, “Bills”
💱 Multi‑currency support – display amounts in different currencies
📤 Export/Import – CSV export of transaction history and import from bank statements

👥 Target Audience
End‑users who want a simple, private way to track daily spending without creating an account
Freelancers and students looking for a no‑frills budget overview
Developers who want a clean example of a vanilla JS + localStorage app

## 🚀 Getting Started

Because FinanceFlow is pure static HTML/CSS/JS, **no installation** is required.

### Option 1 – Just open the file
1. Download or clone this repository.
2. Double‑click `index.html` – it will open in your default browser.
3. Start adding your transactions immediately.

### Option 2 – Run a local server (optional)
If you prefer serving via `http://`, use any static server:
```bash
# Using Python 3
python -m http.server 8000

# Using npx (Node.js)
npx serve .

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Made with ❤️ for simple personal finance.

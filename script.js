const API_URL = 'http://localhost/trading/backend/api.php';

// 1.fetch data from PHPshow in the table  
async function fetchTrades() {
    try {
        const response = await fetch(API_URL);
        const trades = await response.json();
        
        const tableBody = document.getElementById('tradesTableBody');
        tableBody.innerHTML = ''; // clear table

        trades.forEach(trade => {
            const row = `
                <tr>
                    <td>${trade.asset}</td>
                    <td>${trade.strategy}</td>
                    <td>${trade.entry_price}</td>
                    <td>${trade.exit_price}</td>
                    <td class="${trade.pnl >= 0 ? 'profit' : 'loss'}">$${trade.pnl}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error fetching trades:', error);
    }
}

// 2. send new data to PHP
document.getElementById('tradeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const tradeData = {
        asset: document.getElementById('asset').value,
        strategy: document.getElementById('strategy').value,
        entry_price: document.getElementById('entry_price').value,
        exit_price: document.getElementById('exit_price').value,
        pnl: document.getElementById('pnl').value
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tradeData)
        });
        
        document.getElementById('tradeForm').reset(); // to clear the form
        fetchTrades(); // tor Refresh the table
    } catch (error) {
        console.error('Error adding trade:', error);
    }
});

// fetch the data when open the page
fetchTrades();
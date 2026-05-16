import React, { useState, useEffect } from 'react';
import './App.css'; // css 

function App() {
  const [trades, setTrades] = useState([]);
  const [formData, setFormData] = useState({
    asset: '', strategy: 'SMC', entry_price: '', exit_price: '', pnl: ''
  });

  // fetch the data from PHP API 
  const fetchTrades = async () => {
    const response = await fetch('http://localhost/backend/api.php');
    const data = await response.json();
    setTrades(data);
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  // when fill the form take the data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // send new data to PHP
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost/backend/api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ asset: '', strategy: 'SMC', entry_price: '', exit_price: '', pnl: '' });
    fetchTrades(); // to make the table new
  };

  return (
    <div className="App">
      <h1>My Trading Journal</h1>
      
      <form onSubmit={handleSubmit} className="trade-form">
        <input type="text" name="asset" placeholder="Asset (e.g. EUR/AUD)" value={formData.asset} onChange={handleChange} required />
        <select name="strategy" value={formData.strategy} onChange={handleChange}>
          <option value="SMC">SMC (Smart Money Concepts)</option>
          <option value="ICT">ICT (Inner Circle Trader)</option>
          <option value="Liquidity Sweep">Liquidity Sweep</option>
          <option value="Price Action">Price Action</option>
        </select>
        <input type="number" step="0.0001" name="entry_price" placeholder="Entry Price" value={formData.entry_price} onChange={handleChange} required />
        <input type="number" step="0.0001" name="exit_price" placeholder="Exit Price" value={formData.exit_price} onChange={handleChange} required />
        <input type="number" step="0.01" name="pnl" placeholder="Profit/Loss ($)" value={formData.pnl} onChange={handleChange} required />
        <button type="submit">Add Trade</button>
      </form>

      <h2>Recent Trades</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Strategy</th>
            <th>Entry</th>
            <th>Exit</th>
            <th>P&L</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id}>
              <td>{trade.asset}</td>
              <td>{trade.strategy}</td>
              <td>{trade.entry_price}</td>
              <td>{trade.exit_price}</td>
              <td style={{ color: trade.pnl >= 0 ? 'green' : 'red' }}>${trade.pnl}</td>
              <td>{new Date(trade.trade_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
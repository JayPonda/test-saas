import React, { useState, useEffect } from 'react';
import { subscriptionPaymentService } from '../service';
import '../styles/DataTable.css';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await subscriptionPaymentService.getAllPayments();
      setPayments(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to fetch payments: ' + error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedPayments = [...payments].sort((a, b) => {
    if (sortBy === 'amount') {
      return parseFloat(b.amount || 0) - parseFloat(a.amount || 0);
    }
    return new Date(b.paymentDate) - new Date(a.paymentDate);
  });

  const stats = {
    total: payments.length,
    totalAmount: payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0),
    completed: payments.filter(p => p.status === 'completed').length,
  };

  return (
    <div className="data-container">
      <div className="data-header">
        <div>
          <h2>Payment Management</h2>
          <p className="subtitle">Total Revenue: ${stats.totalAmount.toFixed(2)} | Payments: {stats.total} | Completed: {stats.completed}</p>
        </div>
        <button className="refresh-btn" onClick={fetchPayments} disabled={loading}>
          {loading ? 'Loading...' : '↻ Refresh'}
        </button>
      </div>

      <div className="filter-bar">
        <label>Sort by:</label>
        <select 
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Date (Latest)</option>
          <option value="amount">Amount (Highest)</option>
        </select>
      </div>

      {error && (
        <div className="error-message">
          <span>⚠️</span> {error}
        </div>
      )}

      <div className="table-wrapper">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            Loading payments...
          </div>
        ) : payments.length === 0 ? (
          <div className="empty-state">
            <p>📭 No payments found</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Subscription ID</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Status</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="id-column">{payment.id}</td>
                  <td>{payment.subscriptionId}</td>
                  <td className="amount-column">
                    <strong>${parseFloat(payment.amount || 0).toFixed(2)}</strong>
                  </td>
                  <td>{payment.currency || 'USD'}</td>
                  <td>
                    <span className={`status-badge ${payment.status || 'completed'}`}>
                      {payment.status || 'COMPLETED'}
                    </span>
                  </td>
                  <td className="date-column">
                    {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Payments;

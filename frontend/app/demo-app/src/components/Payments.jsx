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
    // Sort by transaction_meta.ended_at if available, otherwise by subscription_started_at
    const dateA = a.transaction_meta?.ended_at || a.subscription_started_at;
    const dateB = b.transaction_meta?.ended_at || b.subscription_started_at;
    return new Date(dateB) - new Date(dateA);
  });

  const stats = {
    total: payments.length,
    totalAmount: payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0),
    completed: payments.filter(p => p.transaction_meta?.status === 'completed').length,
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
                <th>Status</th>
                <th>Payment Date</th>
                <th>Transaction Type</th>
              </tr>
            </thead>
            <tbody>
              {sortedPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="id-column">{payment.id}</td>
                  <td>{payment.subscription_id}</td>
                  <td className="amount-column">
                    <strong>${parseFloat(payment.amount || 0).toFixed(2)}</strong>
                  </td>
                  <td>
                    <span className={`status-badge ${payment.transaction_meta?.status || 'unknown'}`}>
                      {payment.transaction_meta?.status || 'UNKNOWN'}
                    </span>
                  </td>
                  <td className="date-column">
                    {payment.transaction_meta?.ended_at ? new Date(payment.transaction_meta.ended_at).toLocaleDateString() : '-'}
                  </td>
                  <td>{payment.transaction_meta?.transaction_type || '-'}</td>
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

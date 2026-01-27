import React, { useState, useEffect } from 'react';
import { subscriptionService } from '../service';
import '../styles/DataTable.css';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await subscriptionService.getAllSubscriptions();
      setSubscriptions(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to fetch subscriptions: ' + error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubscription = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subscription?')) return;
    
    try {
      await subscriptionService.deleteSubscription(id);
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    } catch (error) {
      alert('Failed to delete subscription: ' + error.message);
    }
  };

  const filteredSubs = filter === 'all' 
    ? subscriptions 
    : subscriptions.filter(sub => sub.status === filter);

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter(s => s.status === 'active').length,
    inactive: subscriptions.filter(s => s.status === 'inactive').length,
  };

  return (
    <div className="data-container">
      <div className="data-header">
        <div>
          <h2>Subscription Management</h2>
          <p className="subtitle">Active: {stats.active} | Inactive: {stats.inactive} | Total: {stats.total}</p>
        </div>
        <button className="refresh-btn" onClick={fetchSubscriptions} disabled={loading}>
          {loading ? 'Loading...' : '↻ Refresh'}
        </button>
      </div>

      <div className="filter-bar">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({subscriptions.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active ({stats.active})
        </button>
        <button 
          className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`}
          onClick={() => setFilter('inactive')}
        >
          Inactive ({stats.inactive})
        </button>
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
            Loading subscriptions...
          </div>
        ) : filteredSubs.length === 0 ? (
          <div className="empty-state">
            <p>📭 No subscriptions found</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubs.map((sub) => (
                <tr key={sub.id}>
                  <td className="id-column">{sub.id}</td>
                  <td>{sub.userId}</td>
                  <td className="type-column">{sub.subscriptionType || '-'}</td>
                  <td>
                    <span className={`status-badge ${sub.status || 'active'}`}>
                      {sub.status || 'ACTIVE'}
                    </span>
                  </td>
                  <td className="date-column">
                    {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="date-column">
                    {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : 'Ongoing'}
                  </td>
                  <td>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteSubscription(sub.id)}
                      title="Delete subscription"
                    >
                      Delete
                    </button>
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

export default Subscriptions;

import React, { useState, useEffect } from 'react';
import { analysisService } from '../service';
import '../styles/Analytics.css';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    mrr: null,
    oneTimeRevenue: null,
    refunds: null,
    funnel: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [mrr, oneTime, refunds, funnel] = await Promise.all([
        analysisService.getMonthlyRecurringRevenue(),
        analysisService.getOneTimePaymentRevenue(),
        analysisService.getRefunds(),
        analysisService.getFunnel(),
      ]);

      setAnalytics({
        mrr: mrr?.monthlyRecurringRevenue,
        oneTimeRevenue: oneTime?.oneTimePaymentRevenue,
        refunds: refunds?.totalRefunds,
        funnel: funnel, // funnel is already an object with the required data
      });
    } catch (error) {
      setError('Failed to fetch analytics: ' + error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const Card = ({ title, value, subtitle, icon }) => (
    <div className="analytics-card">
      {icon && <div className="card-icon">{icon}</div>}
      <h3>{title}</h3>
      <div className="card-value">{value !== null && value !== undefined ? value : 'N/A'}</div>
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
    </div>
  );

  const formatCurrency = (value) => {
    if (value === null || value === undefined || isNaN(value)) return 'N/A';
    return `$${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <div>
          <h2>Dashboard Analytics</h2>
          <p className="subtitle">Real-time insights and key metrics</p>
        </div>
        <button className="refresh-btn" onClick={fetchAnalytics} disabled={loading}>
          {loading ? 'Loading...' : '↻ Refresh'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span>⚠️</span> {error}
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          Loading analytics data...
        </div>
      ) : (
        <div className="analytics-grid">
          <Card 
            title="Monthly Recurring Revenue" 
            value={formatCurrency(analytics.mrr)}
            icon="📈"
          />
          <Card 
            title="One-Time Revenue" 
            value={formatCurrency(analytics.oneTimeRevenue)}
            icon="💰"
          />
          <Card 
            title="Total Refunds" 
            value={formatCurrency(analytics.refunds)}
            icon="↩️"
          />
          {analytics.funnel && (
            <>
              <Card 
                title="Total Users Registered" 
                value={analytics.funnel.totalUsersRegistered !== null ? analytics.funnel.totalUsersRegistered : 'N/A'}
                icon="👥"
              />
              <Card 
                title="Users Who Bought" 
                value={analytics.funnel.usersWhoBoughtSubscription !== null ? analytics.funnel.usersWhoBoughtSubscription : 'N/A'}
                icon="🛒"
              />
              <Card 
                title="Users Who Cancelled" 
                value={analytics.funnel.usersWhoCancelledSubscription !== null ? analytics.funnel.usersWhoCancelledSubscription : 'N/A'}
                icon="💔"
              />
            </>
          )}
        </div>
      )}

      {process.env.NODE_ENV === 'development' && analytics.funnel && (
        <div className="raw-data">
          <h3>📊 Raw Funnel Data (Development Mode)</h3>
          <pre>{JSON.stringify(analytics.funnel, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Analytics;

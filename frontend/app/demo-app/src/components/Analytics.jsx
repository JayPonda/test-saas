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
        analysisService.getMonthlyRecurringRevenue().catch(err => {
          console.error('MRR Error:', err.message);
          return null;
        }),
        analysisService.getOneTimePaymentRevenue().catch(err => {
          console.error('One-time Revenue Error:', err.message);
          return null;
        }),
        analysisService.getRefunds().catch(err => {
          console.error('Refunds Error:', err.message);
          return null;
        }),
        analysisService.getFunnel().catch(err => {
          console.error('Funnel Error:', err.message);
          return null;
        }),
      ]);

      setAnalytics({
        mrr: mrr?.data !== undefined ? mrr?.data : mrr,
        oneTimeRevenue: oneTime?.data !== undefined ? oneTime?.data : oneTime,
        refunds: refunds?.data !== undefined ? refunds?.data : refunds,
        funnel: funnel?.data !== undefined ? funnel?.data : funnel,
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
      <div className="card-value">{value || 'N/A'}</div>
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
    </div>
  );

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return 'N/A';
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
            <Card 
              title="Funnel Events" 
              value={Array.isArray(analytics.funnel) ? analytics.funnel.length : 'Available'}
              subtitle={Array.isArray(analytics.funnel) ? 'Conversion pipeline' : 'View in console'}
              icon="🔗"
            />
          )}
        </div>
      )}

      {process.env.NODE_ENV === 'development' && analytics.funnel && (
        <div className="raw-data">
          <h3>📊 Funnel Data (Development Mode)</h3>
          <pre>{JSON.stringify(analytics.funnel, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Analytics;

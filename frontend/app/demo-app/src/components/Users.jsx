import React, { useState, useEffect } from 'react';
import { userService, sessionService } from '../service';
import '../styles/DataTable.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      setError('Failed to fetch users: ' + error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginUser = async (userId) => {
    try {
      const session = await sessionService.createSession(userId);
      alert(`Session created: ${session.sessionId}`);
      fetchUsers();
    } catch (error) {
      alert('Failed to create session: ' + error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return '#10b981';
      case 'churned':
        return '#ef4444';
      default:
        return '#6366f1';
    }
  };

  return (
    <div className="data-container">
      <div className="data-header">
        <div>
          <h2>User Management</h2>
          <p className="subtitle">Total Users: {users.length}</p>
        </div>
        <button className="refresh-btn" onClick={fetchUsers} disabled={loading}>
          {loading ? 'Loading...' : '↻ Refresh'}
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
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="empty-state">
            <p>📭 No users found</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className={selectedUser?.id === user.id ? 'selected' : ''}>
                  <td className="id-column">{user.id}</td>
                  <td>{user.firstName || '-'}</td>
                  <td>{user.lastName || '-'}</td>
                  <td className="email-column">{user.email}</td>
                  <td>
                    <span className="status-badge" style={{ borderColor: getStatusColor(user.status) }}>
                      {user.status || 'ACTIVE'}
                    </span>
                  </td>
                  <td className="date-column">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                  </td>
                  <td>
                    <button 
                      className="action-btn login-btn"
                      onClick={() => handleLoginUser(user.id)}
                      title="Create session"
                    >
                      Login
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

export default Users;

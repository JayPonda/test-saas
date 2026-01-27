# Frontend-Backend Integration Guide

## How API Requests Work

### 1. **Service Layer Flow**

```
Component → userService.getAllUsers() 
         → axios GET /api/users
         → Response interceptor
         → Component state update
```

### 2. **SessionController Integration**

The backend's `SessionController` expects:

```javascript
// POST /api/sessions
{
  "user_id": number
}

// Response
{
  "sessionId": "session-id-value"
}
```

**Frontend Implementation:**

```javascript
// src/service/index.js
sessionService.createSession: async (userId) => {
  const response = await apiClient.post('/sessions', { user_id: userId });
  return response.data; // Returns { sessionId: ... }
}

// src/components/Users.jsx
const handleLoginUser = async (userId) => {
  const session = await sessionService.createSession(userId);
  alert(`Session created: ${session.sessionId}`);
}
```

### 3. **UserController Integration**

The backend's `UserController` returns:

```javascript
// GET /api/users - Returns array of users
[
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    status: "ACTIVE",
    createdAt: "2024-01-27T...",
    ...
  }
]

// GET /api/users/:id - Returns single user
{
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  status: "ACTIVE",
  createdAt: "2024-01-27T...",
  ...
}
```

**Frontend Usage:**

```javascript
// src/service/index.js
userService.getAllUsers: async () => {
  const response = await apiClient.get('/users');
  return response.data; // Array of users
}

// src/components/Users.jsx
const fetchUsers = async () => {
  const data = await userService.getAllUsers();
  setUsers(Array.isArray(data) ? data : []);
}
```

### 4. **SubscriptionController Integration**

```javascript
// GET /api/subscriptions - Returns array
// Response includes fields: id, userId, subscriptionType, status, startDate, endDate

// DELETE /api/subscriptions/:id
// Returns: { message: "deleted successfully" }

// PUT /api/subscriptions/:id
// Updates subscription with new data

// POST /api/subscriptions
// Creates new subscription
```

**Frontend Usage:**

```javascript
// src/components/Subscriptions.jsx
const handleDeleteSubscription = async (id) => {
  await subscriptionService.deleteSubscription(id);
  setSubscriptions(subscriptions.filter(sub => sub.id !== id));
}
```

### 5. **SubscriptionPaymentController Integration**

```javascript
// GET /api/subscription-payments
// Returns: Array of payments with fields:
// id, subscriptionId, amount, currency, status, paymentDate

// POST /api/subscription-payments
// Creates new payment
```

**Frontend Usage:**

```javascript
// src/service/index.js
subscriptionPaymentService.getAllPayments: async () => {
  const response = await apiClient.get('/subscription-payments');
  return response.data;
}
```

### 6. **AnalysisController Integration**

```javascript
// GET /api/analysis/monthly-recurring-revenue
// Returns: number (e.g., 5000.00)

// GET /api/analysis/one-time-payment-revenue
// Returns: number (e.g., 2500.00)

// GET /api/analysis/refunds
// Returns: number (e.g., 150.00)

// GET /api/analysis/funnel
// Returns: array of funnel events or objects
```

**Frontend Usage:**

```javascript
// src/service/index.js
analysisService.getMonthlyRecurringRevenue: async () => {
  const response = await apiClient.get('/analysis/monthly-recurring-revenue');
  return response.data; // Returns number
}

// src/components/Analytics.jsx
const formatCurrency = (value) => {
  return `$${parseFloat(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

<Card value={formatCurrency(analytics.mrr)} />
```

## Request/Response Cycle

### Successful Request

```
1. Component calls service method
   └─ userService.getAllUsers()

2. Service creates axios request
   └─ GET http://localhost:8080/api/users
   └─ Headers: { Authorization: Bearer ${sessionId} }

3. Request interceptor (adds auth)
   └─ Checks localStorage for sessionId
   └─ Adds to Authorization header

4. Backend processes request
   └─ Authenticates user
   └─ Returns data with 200 status

5. Response interceptor processes
   └─ Checks status code
   └─ Returns response.data

6. Component receives data
   └─ setUsers(data)
   └─ Updates UI
```

### Failed Request (Example)

```
1. GET /api/users fails (401 Unauthorized)

2. Response interceptor catches error
   └─ Checks error.response?.status === 401
   └─ Removes sessionId from localStorage
   └─ Redirects to /login

3. Component catches error
   └─ setError('Failed to fetch users: ' + error.message)
   └─ Shows error message to user
   └─ Logs to console for debugging
```

## Data Flow Example: User Login

### Step 1: User clicks Login button
```javascript
// src/components/Users.jsx
<button onClick={() => handleLoginUser(user.id)}>Login</button>
```

### Step 2: Service creates session
```javascript
// src/service/index.js
const response = await apiClient.post('/sessions', { user_id: userId });
// POST to http://localhost:8080/api/sessions
// Body: { user_id: 123 }
```

### Step 3: Backend creates session
```javascript
// backend/app/controllers/SessionController.js
export const createSession = async (req, res) => {
  const { user_id } = req.body;
  const session = await Session.create({
    user_id,
    login_at: new Date(),
    ip_address: req.ip,
    user_agent: req.headers['user-agent'],
    login_successful: true,
  });
  res.status(201).json({ sessionId: session.id });
};
```

### Step 4: Frontend receives sessionId
```javascript
// src/components/Users.jsx
const session = await sessionService.createSession(userId);
// { sessionId: "abc123def456..." }
alert(`Session created: ${session.sessionId}`);
```

### Step 5: SessionId stored for future requests
```javascript
// src/service/index.js (in interceptor)
const sessionId = localStorage.getItem('sessionId');
if (sessionId) {
  config.headers.Authorization = `Bearer ${sessionId}`;
}
```

## Handling Different Response Types

### When API returns data directly

```javascript
// Backend returns array
[{ id: 1, name: "John" }]

// Frontend receives
const data = await userService.getAllUsers();
setUsers(Array.isArray(data) ? data : []);
```

### When API returns object with data property

```javascript
// Backend returns
{ data: [{ id: 1, name: "John" }] }

// Frontend receives
const data = await userService.getAllUsers();
setUsers(data?.data || data || []);
```

### When API returns numeric value

```javascript
// Backend returns
5000.00

// Frontend receives and formats
const mrr = await analysisService.getMonthlyRecurringRevenue();
`$${parseFloat(mrr).toFixed(2)}`
// Output: $5000.00
```

## Error Handling Examples

### Network Error
```javascript
try {
  await userService.getAllUsers();
} catch (error) {
  setError('Failed to fetch users: Network error');
  console.error('Error:', error); // See details in console
}
```

### 401 Unauthorized
```javascript
// Response interceptor handles automatically
// - Removes sessionId from localStorage
// - Redirects to /login
// - Component shows error message
```

### Server Error (500)
```javascript
try {
  await subscriptionService.deleteSubscription(id);
} catch (error) {
  alert('Failed to delete subscription: Server error');
  // Backend sent 500 error
}
```

## Testing API Connectivity

### 1. Open Browser Console (F12)
```
Network tab will show all API requests
```

### 2. Check Request Details
```
URL: http://localhost:8080/api/users
Method: GET
Status: 200
Headers: Authorization: Bearer [sessionId]
```

### 3. Verify Response
```
Response should contain array of users
[
  { id: 1, firstName: "John", ... },
  { id: 2, firstName: "Jane", ... }
]
```

### 4. Check for Errors
```
Look for red responses (4xx, 5xx)
Check Console tab for error messages
```

## Common Issues and Solutions

### Issue: "API is not responding"
**Solution:**
- Ensure backend is running: `npm run dev` in `/backend/app`
- Check backend is on port 8080
- Check `VITE_API_BASE_URL` in browser console Network tab

### Issue: "Failed to fetch users: 401"
**Solution:**
- Session might be expired
- Clear localStorage and login again
- Ensure sessionId is being stored correctly

### Issue: "Cannot read property 'data' of undefined"
**Solution:**
- Backend might be returning different structure
- Check browser Network tab Response tab
- Update service to handle response format

### Issue: CORS errors
**Solution:**
- Backend needs CORS configured: `app.use(cors())`
- Check backend app.js has CORS middleware
- Verify Origin header in backend logs

## Best Practices

1. **Always check response structure in Network tab**
   - See what backend is actually returning
   - Match frontend code to backend response

2. **Use error logging for debugging**
   - Console shows detailed error messages
   - Check error.response?.data for backend errors

3. **Handle all response variations**
   ```javascript
   const data = response.data;
   setUsers(Array.isArray(data) ? data : data?.data || []);
   ```

4. **Test with sample data**
   - Use database seeders to create test data
   - Verify seeders ran successfully

5. **Monitor API calls during development**
   - Keep Network tab open
   - Watch request/response cycle
   - Verify correct URLs and methods

## API Base URL Configuration

**Development:**
```
http://localhost:8080/api
```

**Set via environment:**
```bash
VITE_API_BASE_URL=http://localhost:8080/api npm run dev
```

**Or hardcode in service/index.js:**
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## Summary

The frontend communicates with the backend through:
1. **Service layer** - Centralized API calls
2. **Axios client** - HTTP library
3. **Interceptors** - Auth token handling
4. **Error handling** - User-friendly messages
5. **State management** - React hooks

All API requests follow the pattern:
```
Frontend Component → Service Method → Axios Request → Backend → Response → Component Update
```

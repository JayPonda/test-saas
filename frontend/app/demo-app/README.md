# SaaS Admin Dashboard

A professional admin dashboard application built with React that integrates seamlessly with your Express/Sequelize backend API.

## 🎯 Features

✨ **Dashboard Analytics** - Real-time key metrics and revenue insights
👥 **User Management** - View all users and manage sessions
📋 **Subscription Management** - Monitor and manage user subscriptions with filtering
💳 **Payment Processing** - Track payments with sorting and detailed information
📊 **Advanced Analytics** - MRR, one-time revenue, refunds, and funnel analysis

## 📁 Project Structure

```
demo-app/
├── src/
│   ├── components/
│   │   ├── Analytics.jsx       # Dashboard analytics & metrics
│   │   ├── Users.jsx           # User management interface
│   │   ├── Subscriptions.jsx   # Subscription management
│   │   └── Payments.jsx        # Payment tracking
│   ├── service/
│   │   └── index.js            # Centralized API service
│   ├── styles/
│   │   ├── App.css             # Main app styling
│   │   ├── DataTable.css       # Data table component styles
│   │   └── Analytics.css       # Analytics card styles
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- Backend API running on `http://localhost:8080/api`

### Installation

```bash
cd frontend/app/demo-app
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🔗 API Integration

The application connects to your backend API with these endpoints:

### Users
- `GET /api/users` - Fetch all users (requires authentication)
- `GET /api/users/:id` - Fetch specific user (requires authentication)
- `POST /api/sessions` - Create user session with `{ user_id: number }`

### Subscriptions
- `GET /api/subscriptions` - Fetch all subscriptions (requires authentication)
- `GET /api/subscriptions/:id` - Fetch specific subscription
- `POST /api/subscriptions` - Create subscription
- `PUT /api/subscriptions/:id` - Update subscription
- `DELETE /api/subscriptions/:id` - Delete subscription

### Payments
- `GET /api/subscription-payments` - Fetch all payments (requires authentication)
- `GET /api/subscription-payments/:id` - Fetch specific payment
- `POST /api/subscription-payments` - Create payment

### Analytics
- `GET /api/analysis/monthly-recurring-revenue` - MRR data
- `GET /api/analysis/one-time-payment-revenue` - One-time revenue
- `GET /api/analysis/refunds` - Refunds data
- `GET /api/analysis/funnel` - Funnel analytics

## ⚙️ Configuration

Set the API base URL using environment variable:

```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

Or modify in `src/service/index.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
```

## 🏗️ Architecture

### Service Layer (`src/service/index.js`)

The service module provides a centralized API client using Axios with:
- Automatic JWT token handling via `sessionId` localStorage
- Request/response interceptors
- 401 error handling with auto-redirect to login
- Organized service methods by feature

```javascript
import { 
  userService, 
  subscriptionService, 
  analysisService,
  sessionService,
  subscriptionPaymentService 
} from '../service';

// Usage examples
const users = await userService.getAllUsers();
const subscriptions = await subscriptionService.getAllSubscriptions();
const mrr = await analysisService.getMonthlyRecurringRevenue();
const session = await sessionService.createSession(userId);
```

### Component Architecture

- **Stateful Components** - Handle data fetching and state management
- **Error Handling** - Comprehensive error messages and loading states
- **Professional UI** - Clean, modern admin dashboard design
- **Responsive Layout** - Desktop, tablet, and mobile support

## 📊 Key Features Explained

### Dashboard Analytics
- Real-time metrics cards with icons
- Currency formatting with proper decimal places
- Error handling for failed requests
- Comprehensive logging for debugging
- Development-mode funnel data display

### User Management
- View all users with full details (ID, name, email, status, creation date)
- Create sessions for users (login functionality)
- Status indicators with color coding
- User session management

### Subscription Management
- Filter subscriptions by status (All/Active/Inactive)
- Delete subscriptions with confirmation
- Track subscription types, status, and dates
- Real-time statistics (Total, Active, Inactive counts)

### Payment Tracking
- Sort payments by date or amount
- Professional currency formatting
- Status indicators for payment states
- Total revenue calculations
- Payment date tracking

## 🎨 Styling

The application uses modern CSS with:
- CSS Grid for responsive analytics cards
- Flexbox for component layouts
- Professional gradient backgrounds (#1e3c72 → #2a5298)
- Smooth transitions and animations
- Mobile-first responsive design
- Status badges with semantic colors

## 🛠️ Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client with interceptors
- **CSS3** - Modern styling with Grid and Flexbox

## 🚨 Error Handling

The application handles:
- Network errors with user-friendly messages
- 401 unauthorized responses (auto-logout)
- Missing or undefined data gracefully
- Loading states during API calls
- Service creation failures with detailed logging
- All API errors are logged to console for debugging

## 💡 Development Tips

1. **Check Browser Console** - See detailed error messages and API logs
2. **Network Tab** - Monitor API calls, request/response payloads, and status codes
3. **React DevTools** - Inspect component state and props
4. **API Base URL** - Ensure backend is running on correct port
5. **LocalStorage** - Session ID is stored for authentication

## 🔧 Troubleshooting

### No data appears
- ✅ Check if backend API is running on `http://localhost:8080`
- ✅ Open browser console (F12) to see error messages
- ✅ Verify database has seeded data with demo seeders
- ✅ Check backend is using correct port and routes are registered

### API connection errors
- ✅ Ensure backend is running: `npm run dev` in `/backend/app`
- ✅ Check CORS configuration on backend
- ✅ Verify `VITE_API_BASE_URL` matches backend URL
- ✅ Look for error messages in browser console

### Authentication errors
- ✅ Clear localStorage: DevTools → Application → Local Storage → Clear
- ✅ Check if user ID exists in database
- ✅ Verify session is created before accessing protected routes

### Data not updating
- ✅ Click the Refresh button (↻) in the page header
- ✅ Check network tab for failed requests
- ✅ Ensure you have database records to display

## 📦 Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider

3. Update `VITE_API_BASE_URL` for production API endpoint

4. Ensure CORS and authentication are properly configured on backend

## 📝 License

© 2026 SaaS Admin Dashboard

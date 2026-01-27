# Analysis Feature Planning

## Objective
To implement an `AnalysisController` with routes/functions to provide various business metrics.

## Common Parameters for all routes
- `data_range`: Start and end dates for data analysis.
- `user_segments`: Filter by user characteristics (e.g., location, demographics - for now just user IDs).
- `subscription_tiers`: Filter by subscription type (e.g., monthly, yearly).

## Routes/Functions
1.  `GET /api/analysis/monthly-recurring-revenue`: Calculates Monthly Recurring Revenue.
2.  `GET /api/analysis/one-time-payment-revenue`: Calculates One-Time Payment Revenue.
3.  `GET /api/analysis/refunds`: Calculates total refunds.
4.  `GET /api/analysis/funnel`: Analyzes user engagement funnel (registration, subscription purchase, cancellation).

## Todo List
- [ ] Create `AnalysisController.js`.
- [ ] Implement `monthlyRecurringRevenue` function.
- [ ] Implement `oneTimePaymentRevenue` function.
- [ ] Implement `refundsAnalysis` function.
- [ ] Implement `funnelAnalysis` function.
- [ ] Create routes for `AnalysisController`.
- [ ] Add routes to `app.js`.

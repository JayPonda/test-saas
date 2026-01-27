import express from 'express';
import db from './models/index.js';
import userRoutes from './routes/users.js';
import subscriptionRoutes from './routes/subscriptions.js';
import subscriptionPaymentRoutes from './routes/subscriptionPayments.js';
import sessionRoutes from './routes/sessions.js';
import analysisRoutes from './routes/analysis.js';
import cors from 'cors'; // Import cors

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS to allow requests from your frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend development server
  credentials: true, // Allow sending cookies/auth headers
}));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

app.use("/api/users", userRoutes); // Use user routes
app.use("/api/subscriptions", subscriptionRoutes); // Use subscription routes
app.use("/api/subscription-payments", subscriptionPaymentRoutes); // Use subscription payment routes
app.use("/api/sessions", sessionRoutes); // Use session routes
app.use("/api/analysis", analysisRoutes); // Use analysis routes

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  // db.sequelize.sync().then(() => {
  //   console.log('Database OK');
  // }).catch((err) => {
  //   console.log(err, "Database Startup Error!");
  // });
});

export default app;


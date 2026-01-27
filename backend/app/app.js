import express from 'express';
import db from './models/index.js';
import userRoutes from './routes/users.js';
import subscriptionRoutes from './routes/subscriptions.js';
import subscriptionPaymentRoutes from './routes/subscriptionPayments.js';
import sessionRoutes from './routes/sessions.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

app.use("/api/users", userRoutes); // Use user routes
app.use("/api/subscriptions", subscriptionRoutes); // Use subscription routes
app.use("/api/subscription-payments", subscriptionPaymentRoutes); // Use subscription payment routes
app.use("/api/sessions", sessionRoutes); // Use session routes

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

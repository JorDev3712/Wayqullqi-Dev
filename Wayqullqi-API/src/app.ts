import express from "express";
import cors from "cors";

// import expenseRoutes from "./presentation/routes/expense.routes";

import userRoutes from "./presentation/routes/user.routes";

const app = express();

app.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // # only for web
}));

app.use(express.json());

// Rutas
app.use("/api/wayqullqi/user", userRoutes);

export default app;

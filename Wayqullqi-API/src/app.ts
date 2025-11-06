import express from "express";
import cors from "cors";

// Middlewars imports
import { TokenValidationMiddleware } from "./middlewares/auth.middleware";

// Routes imports
import userRoutes from "./presentation/routes/user.routes";
import userCardRoutes from "./presentation/routes/user.card.routes";
import userSpendingRoutes from "./presentation/routes/user.card.spending.routes";

const app = express();

app.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // # only for web
}));

app.use(express.json());
// Middlewares globales
app.use(TokenValidationMiddleware);

// Esto hace que todos los BigInt de todas tus respuestas se serialicen automáticamente sin tocar el resto del código.
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function (data) {
    const serialized = JSON.parse(
      JSON.stringify(
        data,
        (_, value) => (typeof value === "bigint" ? value.toString() : value)
      )
    );
    return originalJson.call(this, serialized);
  };
  next();
});

// Rutas
app.use("/api/wayqullqi/user", userRoutes);
app.use("/api/wayqullqi/card", userCardRoutes);
app.use("/api/wayqullqi/card/spend", userSpendingRoutes);

export default app;

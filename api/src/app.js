const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const hiringRoutes = require("./routes/hiringRoutes");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/errorHandler");

const app = express();

app.disable("x-powered-by");
app.use(helmet());

app.use(
  cors({
    origin: process.env.WEB_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "20kb" }));

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  })
);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "bj-bright-api",
    database: require("mongoose").connection.readyState === 1
      ? "connected"
      : "disconnected",
  });
});

app.use("/api/hiring-requirements", hiringRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
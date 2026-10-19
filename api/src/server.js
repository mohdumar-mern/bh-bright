require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = Number(process.env.PORT || 4000);

async function startServer() {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
  });

  function shutdown() {
    server.close(() => {
      console.log("HTTP server closed.");
      process.exit(0);
    });

    setTimeout(() => process.exit(1), 10000).unref();
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

startServer().catch((error) => {
  console.error("Failed to start API:", error.message);
  process.exit(1);
});
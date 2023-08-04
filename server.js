import app from "./app/app.js";
import "dotenv/config";
const port = process.env.PORT;

// handling uncaught exceptions
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log(`shutting down this server for handling uncaught exception:`);
});

// create server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});

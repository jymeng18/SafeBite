// This is the main backend server
// Initializing typescript
import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;

// basic middleware
app.use(express.json());

// health check
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.json({ ok: true });
});

// start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

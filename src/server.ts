// This is the main backend server
// Initializing typescript
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);
const USDA_KEY = process.env.USDA_API_KEY;

if (!USDA_KEY) {
  throw new Error("Missing USDA_API_KEY in .env");
}

app.use(express.json());

// CORS so frontend can call your backend
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "*",
    credentials: true,
  })
);

const USDA_BASE = "https://api.nal.usda.gov/fdc/v1";

// health
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.json({ ok: true });
});

// 1) Search foods: /api/v1/usda/search?query=banana&pageSize=10&pageNumber=1
app.get("/api/v1/usda/search", async (req: Request, res: Response) => {
  try {
    const query = String(req.query.query || "").trim();
    const pageSize = Math.min(Math.max(Number(req.query.pageSize || 10), 1), 50);
    const pageNumber = Math.max(Number(req.query.pageNumber || 1), 1);

    if (!query) return res.status(400).json({ error: "Missing query param: query" });

    const { data } = await axios.get(`${USDA_BASE}/foods/search`, {
      params: { api_key: USDA_KEY, query, pageSize, pageNumber },
      timeout: 10000,
    });

    res.json(data);
  } catch (err: any) {
    res.status(err?.response?.status || 500).json({
      error: "USDA search failed",
      details: err?.response?.data || err.message,
    });
  }
});

// 2) Food details by ID: /api/v1/usda/food/1102653
app.get("/api/v1/usda/food/:fdcId", async (req: Request, res: Response) => {
  try {
    const fdcId = Number(req.params.fdcId);
    if (!Number.isFinite(fdcId)) return res.status(400).json({ error: "fdcId must be a number" });

    const { data } = await axios.get(`${USDA_BASE}/food/${fdcId}`, {
      params: { api_key: USDA_KEY },
      timeout: 10000,
    });

    res.json(data);
  } catch (err: any) {
    res.status(err?.response?.status || 500).json({
      error: "USDA details failed",
      details: err?.response?.data || err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


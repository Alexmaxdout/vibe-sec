import express from "express";
import cors from "cors";
import "dotenv/config";

import analyzeRoute from "./routes/analyzeRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/analyze", analyzeRoute);

app.get("/", (req, res) => {
  res.send("Secure Analyzer Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

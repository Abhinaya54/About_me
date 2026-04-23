import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "about_me";
const collectionName = process.env.MONGODB_COLLECTION || "submissions";

if (!mongoUri) {
  throw new Error("MONGODB_URI is required. Add it to your .env file.");
}

const client = new MongoClient(mongoUri);
let collectionPromise;

async function getCollection() {
  if (!collectionPromise) {
    collectionPromise = client.connect().then(() => client.db(dbName).collection(collectionName));
  }
  return collectionPromise;
}

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/submissions/upsert", async (req, res) => {
  try {
    console.log("/api/submissions/upsert received body:", req.body);
    const { name, patch } = req.body || {};

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Name is required." });
    }

    if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
      return res.status(400).json({ error: "Patch object is required." });
    }

    const trimmedName = name.trim();
    const normalizedName = trimmedName.toLowerCase();
    const now = new Date();

    const collection = await getCollection();
    await collection.updateOne(
      { normalizedName },
      {
        $set: {
          name: trimmedName,
          normalizedName,
          ...patch,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true }
    );

    return res.json({ success: true });
  } catch (error) {
    console.error("Failed to upsert submission", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});

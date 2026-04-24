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
  console.warn("⚠️  MONGODB_URI is not set. Add it to your .env file for production.");
  console.warn("   For development, the health endpoint will work but data endpoints will return errors.");
}

let client = null;
let collectionPromise = null;

async function getCollection() {
  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is not set. Cannot connect to database.");
  }

  if (!collectionPromise) {
    if (!client) {
      client = new MongoClient(mongoUri);
    }
    collectionPromise = client.connect().then(() => {
      console.log("✅ Connected to MongoDB");
      return client.db(dbName).collection(collectionName);
    });
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
    if (!mongoUri) {
      console.error("❌ Database not configured. MONGODB_URI is missing.");
      return res.status(503).json({ error: "Database not configured. Set MONGODB_URI environment variable." });
    }

    console.log("/api/submissions/upsert received body:", req.body);
    const { name, patch } = req.body || {};

    if (typeof name !== "string" || !name.trim()) {
      console.warn("❌ Name is required");
      return res.status(400).json({ error: "Name is required." });
    }

    if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
      console.warn("❌ Patch object is required");
      return res.status(400).json({ error: "Patch object is required." });
    }

    const trimmedName = name.trim();
    const normalizedName = trimmedName.toLowerCase();
    const now = new Date();

    console.log(`📝 Upserting document: ${trimmedName}`);
    const collection = await getCollection();
    const result = await collection.updateOne(
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

    console.log(`✅ Upsert successful:`, { matchedCount: result.matchedCount, upsertedId: result.upsertedId, modifiedCount: result.modifiedCount });
    return res.json({ success: true, upsertedId: result.upsertedId, matchedCount: result.matchedCount });
  } catch (error) {
    console.error("❌ Failed to upsert submission", error.message, error.stack);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});

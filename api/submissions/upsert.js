import { getCollection } from '../_lib/db.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('/api/submissions/upsert received body:', req.body);
    const { name, patch } = req.body || {};

    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    if (!patch || typeof patch !== 'object' || Array.isArray(patch)) {
      return res.status(400).json({ error: 'Patch object is required.' });
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

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to upsert submission', error);
    const statusCode = error.message?.includes('MONGODB_URI') ? 503 : 500;
    return res.status(statusCode).json({ error: error.message || 'Internal server error' });
  }
}


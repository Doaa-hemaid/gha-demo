import { Router } from 'express';
import getDb from '../data/database.js'; // ✅ Import the DB getter

const router = Router();

router.get('/', async (req, res) => {
  const db = getDb(); // ✅ Call it to get the database object
  const allEvents = await db.collection('events').find().toArray();
  res.json({ events: allEvents });
});

router.post('/', async (req, res) => {
  const db = getDb(); // ✅ Call it here too
  const eventData = req.body;
  const result = await db.collection('events').insertOne({ ...eventData });
  res.status(201).json({
    message: 'Event created.',
    event: { ...eventData, id: result.insertedId },
  });
});

export default router;

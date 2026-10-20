// backend/api/src/routes/traceRoutes.js

import { Router } from 'express';
import { logger } from '../utils/logger.js';

const router = Router();

// In-memory or database store placeholder for traces
const traceStore = new Map();

/**
 * GET /api/traces/:runId
 * Retrieves structured agent execution trace for a given run.
 */
router.get('/:runId', async (req, res) => {
  try {
    const { runId } = req.params;
    const trace = traceStore.get(runId);

    if (!trace) {
      return res.status(404).json({ success: false, error: 'Execution trace not found' });
    }

    return res.status(200).json({ success: true, data: trace });
  } catch (err) {
    logger.error({ err, runId: req.params.runId }, '[traceRoutes] Error fetching trace');
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;

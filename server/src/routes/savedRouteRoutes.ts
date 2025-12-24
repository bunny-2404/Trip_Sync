import express from 'express';
import {
    saveRoute,
    getSavedRoutes,
    deleteSavedRoute,
} from '../controllers/savedRouteController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .post(protect, saveRoute)
    .get(protect, getSavedRoutes);

router.route('/:id')
    .delete(protect, deleteSavedRoute);

export default router;

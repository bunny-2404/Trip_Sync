import express from 'express';
import {
    createTrip,
    getTrips,
    updateTrip,
    deleteTrip,
} from '../controllers/tripController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .post(protect, createTrip)
    .get(protect, getTrips);

router.route('/:id')
    .put(protect, updateTrip)
    .delete(protect, deleteTrip);

export default router;

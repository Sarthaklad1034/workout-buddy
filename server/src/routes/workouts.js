import express from 'express';
import {
    getWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout
} from '../controllers/workoutController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth); // Protect all workout routes

router.get('/', getWorkouts);
router.post('/', createWorkout);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;
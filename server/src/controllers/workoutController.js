// controllers/workoutController.js
import Workout from '../models/Workout.js';

export const getWorkouts = async(req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user.userId })
            .sort({ date: -1 });

        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching workouts', error: error.message });
    }
};

export const createWorkout = async(req, res) => {
    try {
        const { title, exercises, duration, date } = req.body;

        const workout = new Workout({
            title,
            exercises,
            duration,
            date,
            user: req.user.userId,
        });

        await workout.save();
        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json({ message: 'Error creating workout', error: error.message });
    }
};

export const updateWorkout = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, exercises, duration, date } = req.body;

        const workout = await Workout.findOne({
            _id: id,
            user: req.user.userId,
        });

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        workout.title = title;
        workout.exercises = exercises;
        workout.duration = duration;
        workout.date = date;

        await workout.save();
        res.json(workout);
    } catch (error) {
        res.status(500).json({ message: 'Error updating workout', error: error.message });
    }
};

export const deleteWorkout = async(req, res) => {
    try {
        const { id } = req.params;

        const workout = await Workout.findOneAndDelete({
            _id: id,
            user: req.user.userId,
        });

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        res.json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting workout', error: error.message });
    }
};
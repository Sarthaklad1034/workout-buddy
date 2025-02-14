// hooks/useWorkouts.js
import { useState } from 'react';
import api from '../utils/api';

const useWorkouts = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWorkouts = async() => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.workouts.getAll();
            setWorkouts(data);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to fetch workouts');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createWorkout = async(workoutData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.workouts.create(workoutData);
            setWorkouts(prevWorkouts => [...prevWorkouts, data]);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to create workout');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateWorkout = async(id, workoutData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.workouts.update(id, workoutData);
            setWorkouts(prevWorkouts =>
                prevWorkouts.map(workout =>
                    workout._id === id ? data : workout
                )
            );
            return data;
        } catch (err) {
            setError(err.message || 'Failed to update workout');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteWorkout = async(id) => {
        setLoading(true);
        setError(null);
        try {
            await api.workouts.delete(id);
            setWorkouts(prevWorkouts =>
                prevWorkouts.filter(workout => workout._id !== id)
            );
        } catch (err) {
            setError(err.message || 'Failed to delete workout');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        workouts,
        loading,
        error,
        fetchWorkouts,
        createWorkout,
        updateWorkout,
        deleteWorkout
    };
};

export default useWorkouts;
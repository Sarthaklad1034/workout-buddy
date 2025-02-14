// utils/helpers.js
export const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
};

export const calculateTotalVolume = (exercises) => {
    return exercises.reduce((total, exercise) => {
        return total + (exercise.sets * exercise.reps * exercise.weight);
    }, 0);
};

export const validateWorkoutForm = (workout) => {
    const errors = {};

    if (!workout.title || !workout.title.trim()) {
        errors.title = 'Title is required';
    }

    if (!workout.date) {
        errors.date = 'Date is required';
    }

    if (!workout.duration || workout.duration <= 0) {
        errors.duration = 'Valid duration is required';
    }

    if (!workout.exercises || !workout.exercises.length) {
        errors.exercises = 'At least one exercise is required';
    } else {
        workout.exercises.forEach((exercise, index) => {
            if (!exercise.name || !exercise.name.trim()) {
                errors[`exercises.${index}.name`] = 'Exercise name is required';
            }
            if (!exercise.sets || exercise.sets <= 0) {
                errors[`exercises.${index}.sets`] = 'Valid sets are required';
            }
            if (!exercise.reps || exercise.reps <= 0) {
                errors[`exercises.${index}.reps`] = 'Valid reps are required';
            }
            if (!exercise.weight || exercise.weight < 0) {
                errors[`exercises.${index}.weight`] = 'Valid weight is required';
            }
        });
    }

    return errors;
};
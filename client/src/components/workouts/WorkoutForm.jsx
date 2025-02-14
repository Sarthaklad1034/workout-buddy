import { useState } from 'react';
import { Dumbbell, Clock, Calendar, Plus, Minus, Save, Activity } from 'lucide-react';

const WorkoutForm = ({ onSubmit, initialData = null }) => {
    const [formData, setFormData] = useState(initialData || {
        title: '',
        duration: '',
        date: new Date().toISOString().split('T')[0],
        exercises: [{ name: '', sets: '', reps: '', weight: '' }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleExerciseChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            exercises: prev.exercises.map((exercise, i) => 
                i === index ? { ...exercise, [field]: value } : exercise
            )
        }));
    };

    const addExercise = () => {
        setFormData(prev => ({
            ...prev,
            exercises: [...prev.exercises, { name: '', sets: '', reps: '', weight: '' }]
        }));
    };

    const removeExercise = (index) => {
        setFormData(prev => ({
            ...prev,
            exercises: prev.exercises.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const processedData = {
            ...formData,
            duration: Number(formData.duration),
            exercises: formData.exercises.map(exercise => ({
                ...exercise,
                sets: Number(exercise.sets),
                reps: Number(exercise.reps),
                weight: Number(exercise.weight)
            }))
        };
        onSubmit(processedData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="p-2 bg-blue-500 rounded-lg">
                    <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">New Workout</h2>
            </div>

            <div className="space-y-6">
                {/* Title Input with Special Design */}
                <div className="relative">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Workout Title"
                        className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg font-medium placeholder-gray-400"
                    />
                </div>

                {/* Duration and Date with Icons */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <Clock className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                            min="1"
                            placeholder="Duration"
                            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <Calendar className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                    </div>
                </div>

                {/* Exercises Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-blue-500" />
                            Exercises
                        </h3>
                        <button
                            type="button"
                            onClick={addExercise}
                            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all flex items-center space-x-1"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {formData.exercises.map((exercise, index) => (
                            <div 
                                key={index} 
                                className="relative p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-all group"
                            >
                                {/* Exercise Header */}
                                <div className="flex justify-between items-center mb-4">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium">
                                        Exercise {index + 1}
                                    </span>
                                    {formData.exercises.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeExercise(index)}
                                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                {/* Exercise Fields */}
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Exercise Name"
                                        value={exercise.name}
                                        onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                                        required
                                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    />
                                    <div className="grid grid-cols-3 gap-3">
                                        <input
                                            type="number"
                                            placeholder="Sets"
                                            value={exercise.sets}
                                            onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                                            required
                                            min="1"
                                            className="w-full px-4 py-2 rounded-lg border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Reps"
                                            value={exercise.reps}
                                            onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                                            required
                                            min="1"
                                            className="w-full px-4 py-2 rounded-lg border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Weight (kg)"
                                            value={exercise.weight}
                                            onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)}
                                            required
                                            min="0"
                                            step="0.5"
                                            className="w-full px-4 py-2 rounded-lg border-2 border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md flex items-center justify-center space-x-2"
                >
                    <Save className="w-5 h-5" />
                    <span>Save Workout</span>
                </button>
            </div>
        </form>
    );
};

export default WorkoutForm;
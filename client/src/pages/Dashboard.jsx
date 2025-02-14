import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import useWorkouts from '../hooks/useWorkouts';
import WorkoutList from '../components/workouts/WorkoutList';
import WorkoutForm from '../components/workouts/WorkoutForm';
import useAuthStore from '../store/authStore';
import { Dumbbell, LogOut, Plus, X } from 'lucide-react';

const Dashboard = () => {
    const [showForm, setShowForm] = useState(true); // Always show form on desktop
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { logout } = useAuth();
    const { workouts, loading, error, fetchWorkouts, createWorkout, deleteWorkout } = useWorkouts();

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const handleCreateWorkout = async (workoutData) => {
        try {
            await createWorkout(workoutData);
            // Don't hide form after submission on desktop
        } catch (err) {
            console.error('Failed to create workout:', err);
        }
    };

    const handleDeleteWorkout = async (id) => {
        try {
            await deleteWorkout(id);
        } catch (err) {
            console.error('Failed to delete workout:', err);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="flex items-center space-x-2">
                    <Dumbbell className="w-6 h-6 animate-pulse text-blue-500" />
                    <span className="text-xl font-medium">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                                <Dumbbell className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Welcome, {user?.name}!
                                </h1>
                                <p className="text-gray-600">Track your fitness journey</p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-8xl mx-auto px-4 py-6">
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <X className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Desktop: Grid Layout / Mobile: Stack Layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Workout List Section - 70% on desktop */}
                    <div className="lg:w-[70%] order-2 lg:order-1">
                        {workouts.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                                <Dumbbell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-xl font-medium text-gray-700">
                                    No workouts yet
                                </h3>
                                <p className="text-gray-500 mt-2">
                                    Start tracking your progress by adding your first workout
                                </p>
                            </div>
                        ) : (
                            <WorkoutList
                                workouts={workouts}
                                onDelete={handleDeleteWorkout}
                            />
                        )}
                    </div>

                    {/* Workout Form Section - 30% on desktop */}
                    <div className="lg:w-[30%] order-1 lg:order-2">
                        <div className="sticky top-6">
                            <WorkoutForm onSubmit={handleCreateWorkout} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
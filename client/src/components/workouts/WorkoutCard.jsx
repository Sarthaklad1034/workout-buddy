import { Activity, Calendar, Clock, Trash2 } from 'lucide-react';

const WorkoutCard = ({ workout, onDelete }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const MetricBadge = ({ value, label, highlight }) => (
        <div className={`px-3 py-1.5 rounded-lg ${highlight ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'}`}>
          <div className="flex flex-col items-center">
            <span className={`text-base font-semibold ${highlight ? 'text-blue-700' : 'text-gray-700'}`}>
              {value}
            </span>
            <span className={`text-xs tracking-wide ${highlight ? 'text-blue-600' : 'text-gray-500'}`}>
              {label}
            </span>
          </div>
        </div>
      );

    // Calculate total volume for the workout
    const totalVolume = workout.exercises.reduce((acc, exercise) => {
        return acc + (exercise.sets * exercise.reps * exercise.weight);
    }, 0);

    return (
        <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-500 transition-all hover:shadow-lg">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white">{workout.title}</h3>
                    <button
                        onClick={() => onDelete(workout._id)}
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="mt-4 flex items-center space-x-4 text-white/90">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(workout.date)}
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {workout.duration}m
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Total Volume</p>
                        <p className="text-lg font-semibold text-gray-900">{totalVolume.toLocaleString()} kg</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Exercises</p>
                        <p className="text-lg font-semibold text-gray-900">{workout.exercises.length}</p>
                    </div>
                </div>
            </div>

            {/* Exercises Section */}
            <div className="p-4">
                <div className="space-y-3">
                    {workout.exercises.map((exercise, index) => (
                        <div 
                            key={index}
                            className="relative p-3 rounded-lg border border-gray-100 hover:border-blue-200 bg-gradient-to-r from-gray-50 to-white transition-all group"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Activity className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h5 className="font-medium text-gray-900">
                                        {exercise.name}
                                    </h5>
                                    <div className="mt-2 flex items-center gap-3">
  <MetricBadge 
    value={exercise.sets}
    label="Sets"
  />
  <MetricBadge 
    value={exercise.reps}
    label="Reps"
  />
  <MetricBadge 
    value={exercise.weight}
    unit="kg"
    label="Weight"
  />
</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkoutCard;
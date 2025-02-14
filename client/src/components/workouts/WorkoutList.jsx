// components/workouts/WorkoutList.jsx
import WorkoutCard from './WorkoutCard';

const WorkoutList = ({ workouts, onDelete }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map(workout => (
                <WorkoutCard
                    key={workout._id}
                    workout={workout}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default WorkoutList;
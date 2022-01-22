import { IWorkout } from '../types';

interface IWorkoutListProps {
  workouts?: IWorkout[];
}

export const WorkoutList = ({ workouts }: IWorkoutListProps) => {
  if (!workouts || workouts.length === 0) {
    return <div>No workouts found.</div>;
  }

  return (
    <div>
      <h2>Your workouts</h2>
      <ul>
        {workouts.map((workout: IWorkout) => (
          <li>
            <h3>{workout.name}</h3>
            <span>{workout.tracks.length} tracks</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

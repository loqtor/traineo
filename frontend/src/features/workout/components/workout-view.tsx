import { IWorkout, Track } from '../types';
import { WorkoutTrack } from './workout-track';

export interface IWorkoutViewProps {
  workout: IWorkout;
  workoutViewAction?: (workout: IWorkout) => void;
}

export const WorkoutView = ({ workout, workoutViewAction }: IWorkoutViewProps) => {
  return (
    <div>
      <h2>{workout.name}</h2>
      {workout.tracks.map((track: Track) => (
        <WorkoutTrack key={track.id} track={track} />
      ))}
      {workoutViewAction && <button onClick={() => workoutViewAction(workout)}>Start workout</button>}
    </div>
  );
};

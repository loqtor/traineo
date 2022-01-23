import { IWorkout, Track } from '../types';
import { WorkoutTrack } from './workout-track';

export interface IWorkoutViewProps {
  workout: IWorkout;
}

export const WorkoutView = ({ workout }: IWorkoutViewProps) => {
  return (
    <div>
      <h2>{workout.name}</h2>
      {workout.tracks.map((track: Track) => (
        <WorkoutTrack key={track.id} track={track} />
      ))}
    </div>
  );
};

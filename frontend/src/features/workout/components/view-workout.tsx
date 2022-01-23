import { IWorkout, Track } from '../types';
import { WorkoutTrack } from './workout-track';

export interface IViewWorkoutProps {
  workout: IWorkout;
}

export const ViewWorkout = ({ workout }: IViewWorkoutProps) => {
  return (
    <div>
      <h2>{workout.name}</h2>
      {workout.tracks.map((track: Track) => (
        <WorkoutTrack key={track.id} track={track} />
      ))}
    </div>
  );
};

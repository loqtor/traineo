import { Track } from '../types';

export interface IWorkoutTrackProps {
  track: Track;
}

export const WorkoutTrack = ({ track }: IWorkoutTrackProps) => <div>This is a workout track: {track.id}</div>;

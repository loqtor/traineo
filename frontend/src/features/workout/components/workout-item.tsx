import { useEffect } from 'react';
import { useState } from 'react';
import { useWebSockets } from '../../../hooks/useWebSockets';
import { WorkoutSocketEvents } from '../hooks/useBroadcastWorkoutEvent';
import { IWorkout } from '../types';

export interface IWorkoutItemProps {
  workout: IWorkout;
  onWorkoutClick?: (workout: IWorkout) => void;
}

export const WorkoutItem = ({ workout, onWorkoutClick }: IWorkoutItemProps) => {
  const [showWorkoutAsActive, setShowWorkoutAsActive] = useState<boolean>(false);
  const { init } = useWebSockets({
    events: [
      {
        event: WorkoutSocketEvents.WORKOUT_START,
        callback: (startedWorkout: IWorkout) => {
          if (startedWorkout.id === workout.id) {
            setShowWorkoutAsActive(true);
          }
        },
      },
    ],
  });

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <h3>{workout.name}</h3>
      <p>{workout.tracks.length} tracks</p>
      {showWorkoutAsActive && <p>Someone is doing this workout right now!</p>}
      {onWorkoutClick && <button onClick={() => onWorkoutClick(workout)}>See details</button>}
    </div>
  );
};

import { useEffect, useState } from 'react';
import { WorkoutView } from './features/workout/components/workout-view';
import { WorkoutList } from './features/workout/components/workout-list';
import { useWorkouts } from './features/workout/hooks/useWorkouts';
import { IWorkout } from './features/workout/types';
import { useWebSockets } from './hooks/useWebSockets';
import { WorkoutPlay, WorkoutPlayStatus } from './features/workout/components/workout-play';
import { useStartWorkout } from './features/workout/hooks/useStartWorkout';

const App = () => {
  const { init: initWebSockets, socketConnection } = useWebSockets({});
  const { workouts, isLoading: isLoadingWorkouts, isError: isErrorWorkouts } = useWorkouts();
  const [selectedWorkout, setWorkoutSelected] = useState<IWorkout>();
  const [activeWorkout, setActiveWorkout] = useState<IWorkout>();
  const { broadcastWorkoutStart } = useStartWorkout();

  useEffect(() => {
    const startSockets = async () => {
      return await initWebSockets();
    };

    startSockets();
  }, []);

  /**
   * Callback to take the user to workout they selected.
   * @NOTE: Once react-router is installed, this would just
   * take the user to the workout page.
   * @param workout The workout the user would like to see the details of
   */
  const goToWorkout = (workout: IWorkout) => {
    setWorkoutSelected(workout);
  };

  /**
   * Called when a workout that's being viewed is played.
   * @NOTE: Same as the function above.
   * @param workout Sets the workout as active and starts "playing" it
   */
  const startWorkout = (workout: IWorkout) => {
    setActiveWorkout(workout);
    broadcastWorkoutStart(workout);
  };

  const goToDashboard = () => {
    setWorkoutSelected(undefined);
    setActiveWorkout(undefined);
  };

  if (activeWorkout) {
    return (
      <main>
        <h1>Traineo</h1>
        <WorkoutPlay workout={activeWorkout} initialStatus={WorkoutPlayStatus.IN_PROGRESS} />
        <button onClick={goToDashboard}>Back to Dashboard</button>
      </main>
    );
  }

  if (selectedWorkout) {
    return (
      <main>
        <h1>Traineo</h1>
        <WorkoutView workout={selectedWorkout} workoutViewAction={startWorkout} />
        <button onClick={goToDashboard}>Back to Dashboard</button>
      </main>
    );
  }

  return (
    <main>
      <h1>Traineo</h1>
      <p>{socketConnection?.connected ? 'Socket connected' : 'Connecting...'}</p>
      {isLoadingWorkouts && <p>Loading workouts...</p>}
      {!isLoadingWorkouts && !isErrorWorkouts && <WorkoutList workouts={workouts} onWorkoutClick={goToWorkout} />}
    </main>
  );
};

export default App;

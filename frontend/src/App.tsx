import { useEffect, useState } from 'react';
import { WorkoutView } from './features/workout/components/workout-view';
import { WorkoutList } from './features/workout/components/workout-list';
import { useWorkouts } from './features/workout/hooks/useWorkouts';
import { IWorkout } from './features/workout/types';
import { useWebSockets } from './hooks/useWebSockets';

const App = () => {
  const { init: initWebSockets, socketConnection } = useWebSockets({});
  const { workouts, isLoading: isLoadingWorkouts, isError: isErrorWorkouts } = useWorkouts();
  const [selectedWorkout, setWorkoutSelected] = useState<IWorkout>();

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

  const goToDashboard = () => {
    setWorkoutSelected(undefined);
  };

  if (selectedWorkout) {
    return (
      <main>
        <h1>Traineo</h1>
        <WorkoutView workout={selectedWorkout} />
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

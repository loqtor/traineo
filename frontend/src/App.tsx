import { useEffect } from 'react';
import { WorkoutList } from './features/workout/components/workout-list';
import { useWorkouts } from './features/workout/hooks/useWorkouts';
import { useWebSockets } from './hooks/useWebSockets';

const App = () => {
  const { init: initWebSockets, socketConnection } = useWebSockets({});
  const { workouts, isLoading: isLoadingWorkouts, isError: isErrorWorkouts } = useWorkouts();

  useEffect(() => {
    const startSockets = async () => {
      return await initWebSockets();
    };

    startSockets();
  }, []);

  return (
    <main>
      <h1>Traineo</h1>
      <p>{socketConnection?.connected ? 'Socket connected' : 'Connecting...'}</p>
      {isLoadingWorkouts && <p>Loading workouts...</p>}
      {!isLoadingWorkouts && !isErrorWorkouts && <WorkoutList workouts={workouts} />}
    </main>
  );
};

export default App;

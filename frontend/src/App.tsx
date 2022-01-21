import { useEffect } from 'react';
import { useWebSockets } from './hooks/useWebSockets';

const App = () => {
  const { init: initWebSockets, socketConnection } = useWebSockets({});

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
    </main>
  );
};

export default App;

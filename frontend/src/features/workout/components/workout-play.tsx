import { useState } from 'react';
import { useTrackTimer } from '../hooks/useWorkoutTrackTimer';
import { IWorkout, TCircuit, TExercise, Track, TrackType, TRecovery } from '../types';
import { WorkoutView } from './workout-view';

export interface IWorkoutPlayProps {
  workout: IWorkout;
  initialStatus?: WorkoutPlayStatus;
  onWorkoutStart?: (workout: IWorkout) => void;
  onWorkoutPause?: (workout: IWorkout) => void;
  onWorkoutStop?: (workout: IWorkout) => void;
}

export enum WorkoutPlayStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED',
  FINISHED = 'FINISHED',
}

export const WorkoutPlay = ({ workout, initialStatus }: IWorkoutPlayProps) => {
  const { tracks } = workout;
  const [workoutPlayStatus, setWorkoutPlayStatus] = useState<WorkoutPlayStatus>(
    initialStatus || WorkoutPlayStatus.NOT_STARTED,
  );
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);
  const [activeTrack, setActiveTrack] = useState<Track>(tracks[activeTrackIndex] as Track);

  if (workoutPlayStatus === WorkoutPlayStatus.NOT_STARTED) {
    return (
      <main>
        <button onClick={() => setWorkoutPlayStatus(WorkoutPlayStatus.IN_PROGRESS)}>Start workout</button>
        <WorkoutView workout={workout} />
      </main>
    );
  }

  if (workoutPlayStatus === WorkoutPlayStatus.PAUSED) {
    // @NOTE: To be implemented
  }

  if (workoutPlayStatus === WorkoutPlayStatus.FINISHED) {
    return (
      <main>
        <h1>Congrats, you completed workout {workout.name}</h1>
      </main>
    );
  }

  const goToNextTrack = () => {
    if (activeTrackIndex === workout.tracks.length - 1) {
      setWorkoutPlayStatus(WorkoutPlayStatus.FINISHED);
    }

    const nextIndex = activeTrackIndex + 1;
    setActiveTrackIndex(nextIndex);
    setActiveTrack(tracks[nextIndex] as Track);
  };

  if (activeTrack.type === TrackType.CIRCUIT) {
    return <WorkoutCircuitTrack circuit={activeTrack} onTrackFinish={goToNextTrack} />;
  }

  if (activeTrack.type === TrackType.RECOVERY) {
    return <WorkoutRecoveryTrack recovery={activeTrack} onTrackFinish={goToNextTrack} />;
  }

  return (
    <main>
      <WorkoutExerciseTrack exercise={activeTrack} onTrackFinish={goToNextTrack} />
    </main>
  );
};

export interface IWorkoutCircuitTrackProps {
  circuit: TCircuit;
  onTrackFinish: (track: Track) => void;
}

export const WorkoutCircuitTrack = ({ circuit, onTrackFinish }: IWorkoutCircuitTrackProps) => {
  const { id, name, exercisesAndRecoveries, rounds } = circuit;
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const [activeExercise, setActiveExercise] = useState<TExercise | TRecovery | undefined>(
    exercisesAndRecoveries[activeExerciseIndex],
  );

  let ActiveTrackRendered;

  if (activeExercise?.type === TrackType.EXERCISE) {
    ActiveTrackRendered = <WorkoutExerciseTrack exercise={activeExercise} onTrackFinish={onTrackFinish} />;
  } else if (activeExercise?.type === TrackType.RECOVERY) {
    ActiveTrackRendered = <WorkoutRecoveryTrack recovery={activeExercise} onTrackFinish={onTrackFinish} />;
  } else {
    ActiveTrackRendered = <p>Track unrecognised</p>;
  }

  return (
    <div key={`circuit-${id}`}>
      <p>
        Circuit: <strong>{name}</strong>
      </p>
      {ActiveTrackRendered}
    </div>
  );
};

export interface IWorkoutExerciseTrackProps {
  exercise: TExercise;
  onTrackFinish: (track: Track) => void;
}

export const WorkoutExerciseTrack = ({ exercise, onTrackFinish }: IWorkoutExerciseTrackProps) => {
  const { timeLeft } = useTrackTimer({
    time: exercise.time,
    onTimeFinish: onTrackFinish,
  });

  return (
    <div>
      <p>Exercise {exercise.name}</p>
      {exercise.repetitions && (
        <p>
          Try {exercise.repetitions} in {exercise.time} seconds
        </p>
      )}
      <p>{timeLeft} seconds left.</p>
    </div>
  );
};
export interface IWorkoutRecovryTrackProps {
  recovery: TRecovery;
  onTrackFinish: (track: Track) => void;
}

export const WorkoutRecoveryTrack = ({ recovery, onTrackFinish }: IWorkoutRecovryTrackProps) => {
  const { timeLeft } = useTrackTimer({
    time: recovery.time,
    onTimeFinish: onTrackFinish,
  });

  return (
    <div key={recovery.id}>
      Recovery {recovery.time}
      <p>{timeLeft} seconds left.</p>
    </div>
  );
};

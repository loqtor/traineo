import { TRecovery, TCircuit, TExercise, Track } from '../types';

export interface IWorkoutTrackProps {
  track: Track;
}

export const WorkoutTrack = ({ track }: IWorkoutTrackProps) => {
  const trackAsCircuit = track as TCircuit;
  const trackAsExercise = track as TExercise;

  if (trackAsCircuit.exercises?.length) {
    return <Circuit circuit={trackAsCircuit} />;
  }

  if (trackAsExercise.name) {
    return <Exercise exercise={trackAsExercise} />;
  }

  return <Recovery recovery={track as TRecovery} />;
};

export interface ICircuitProps {
  circuit: TCircuit;
}

export const Circuit = ({ circuit }: ICircuitProps) => (
  <div key={circuit.id}>
    <h4> Circuit {circuit.name}</h4>
    {circuit.exercises.map((exerciseOrRecovery: TExercise | TRecovery) => {
      const exerciseOrRecoveryAsExercise = exerciseOrRecovery as TExercise;
      if ((exerciseOrRecoveryAsExercise as TExercise).name) {
        return <Exercise key={exerciseOrRecovery.id} exercise={exerciseOrRecoveryAsExercise} />;
      }

      return <Recovery key={exerciseOrRecovery.id} recovery={exerciseOrRecovery as TRecovery} />;
    })}
  </div>
);

export interface IExerciseProps {
  exercise: TExercise;
}

export const Exercise = ({ exercise }: IExerciseProps) => (
  <div key={exercise.id}>
    <p>Exercise {exercise.name}</p>
    <p>Duration: {exercise.time}</p>
    {exercise.repetitions && <p>Repetitions: {exercise.repetitions}</p>}
  </div>
);

export interface IRecoveryProps {
  recovery: TRecovery;
}

export const Recovery = ({ recovery }: IRecoveryProps) => <div key={recovery.id}>Recovery {recovery.time} seconds</div>;

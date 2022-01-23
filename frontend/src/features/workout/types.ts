export enum TrackType {
  EXERCISE = 'EXERCISE',
  RECOVERY = 'RECOVERY',
  CIRCUIT = 'CIRCUIT',
}

export type TRecovery = {
  id: string;
  type: TrackType.RECOVERY;
  time: number;
};

export type TExercise = {
  id: string;
  type: TrackType.EXERCISE;
  name: string;
  time: number;
  repetitions?: number;
};

export type TExerciseOrRecovery = TExercise | TRecovery;

export type TCircuit = {
  id: string;
  type: TrackType.CIRCUIT;
  name: string;
  exercisesAndRecoveries: TExerciseOrRecovery[];
  rounds?: number;
};

export type Track = TCircuit | TExercise | TRecovery;

export interface IWorkout {
  id: string;
  name: string;
  tracks: Track[];
}

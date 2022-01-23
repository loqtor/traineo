export type TExercise = {
  id: string;
  name: string;
  time: number;
  repetitions?: number;
};

export type TRecovery = {
  id: string;
  time: number;
};

export type TCircuit = {
  id: string;
  name: string;
  exercises: TExercise[] | TRecovery[];
  rounds?: number;
};

export type Track = TCircuit | TExercise | TRecovery;

export interface IWorkout {
  id: string;
  name: string;
  tracks: Track[];
}

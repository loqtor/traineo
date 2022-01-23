export type IExercise = {
  id: string;
  name: string;
  time: number;
  repetitions?: number;
};

export type IBreak = {
  id: string;
  time: number;
};

export type ICircuit = {
  id: string;
  name: string;
  exercises: IExercise[] | IBreak[];
  rounds?: number;
};

export type Track = ICircuit | IExercise | IBreak;

export interface IWorkout {
  id: string;
  name: string;
  tracks: Track[];
}

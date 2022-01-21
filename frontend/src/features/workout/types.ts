export interface IExercise {
  id: string;
  name: string;
  time: number;
  repetitions?: number;
}

export interface IBreak {
  id: string;
  time: number;
}

export interface ICircuit {
  id: string;
  name: string;
  exercises: IExercise[] | IBreak[];
  rounds?: number;
}

export type Track = ICircuit | IExercise | IBreak;

export interface IWorkout {
  id: string;
  name: string;
  tracks: Track[];
}

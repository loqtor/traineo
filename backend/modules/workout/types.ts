export interface Exercise {
  id: string;
  name: string;
  repetitions?: number;
  time: number;
}

export interface Circuit {
  id: string;
  exercises: Exercise[];
  rounds?: number;
}

export type Track = Circuit | Exercise;

export interface Workout {
  id: string;
  name: string;
  tracks: Track[];
}

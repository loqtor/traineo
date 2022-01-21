export interface Exercise {
  id: string;
  name: string;
  time: number;
  repetitions?: number;
}

export interface Break {
  id: string;
  time: number;
}

export interface Circuit {
  id: string;
  name: string;
  exercises: Exercise[] | Break[];
  rounds?: number;
}

export type Track = Circuit | Exercise | Break;

export interface Workout {
  id: string;
  name: string;
  tracks: Track[];
}

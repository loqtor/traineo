export interface Exercise {
  id: string;
  name: string;
  repetitions?: number;
}

export interface Circuit {
  id: string;
  exercises: Exercise[];
  rounds?: number;
}

export interface Workout {
  id: string;
  name: string;
  track: Circuit[] | Exercise[];
}

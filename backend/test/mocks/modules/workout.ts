import { Exercise, Track, Workout } from "../../../modules/workout/types";

export const generateRandomNumber = () => Math.ceil(Math.random() * 1000);
export const generateRandomExerciseTime = () =>
  Math.round(Math.random() * 10) * 10;
export const generateRandomExercisesNumber = () =>
  Math.round(Math.random() * 10);
export const generateRandomRepetitions = () => Math.round(Math.random() * 10);
export const getRandomElementFromArray = (array: any[]): any =>
  array[Math.floor(Math.random() * array.length)];

export const TRUE_FALSE = [true, false];

export const createExercise = (): Exercise => {
  const id = `${generateRandomNumber()}`;
  const useRepetitions = getRandomElementFromArray(TRUE_FALSE);
  const exercise = {
    id,
    name: `Exercise ${id}`,
    time: generateRandomExerciseTime(),
    ...(useRepetitions ? { repetitions: generateRandomRepetitions() } : {}),
  };

  console.log({ exercise });

  return exercise;
};

export const createMockTracks = (tracksToCreate: number): Track[] => {
  const tracks: Track[] = [];

  while (tracks.length < tracksToCreate) {
    const id = `${generateRandomNumber()}`;
    const useBreak = getRandomElementFromArray(TRUE_FALSE);

    if (useBreak) {
      tracks.push({
        id,
        time: generateRandomExerciseTime(),
      });
    } else {
      tracks.push({
        id,
        name: `Workout ${id}`,
        exercises: [createExercise()],
      });
    }
  }

  return tracks;
};

export const createMockWorkout = (): Workout => {
  const id = `${generateRandomNumber()}`;

  return {
    id,
    name: `Workout ${id}`,
    tracks: createMockTracks(10),
  };
};

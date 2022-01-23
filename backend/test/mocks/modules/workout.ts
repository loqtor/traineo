import {
  TExercise,
  Track,
  IWorkout,
  TrackType,
} from "../../../modules/workout/types";

export const generateRandomNumber = () => Math.ceil(Math.random() * 1000);
export const generateRandomExerciseTime = () =>
  Math.round(Math.random() * 10) * 10;
export const generateRandomExercisesNumber = () =>
  Math.round(Math.random() * 10);
export const generateRandomRepetitions = () => Math.round(Math.random() * 10);
export const getRandomElementFromArray = (array: any[]): any =>
  array[Math.floor(Math.random() * array.length)];

export const TRUE_FALSE = [true, false];

export const createExercise = (): TExercise => {
  const id = `${generateRandomNumber()}`;
  const useRepetitions = getRandomElementFromArray(TRUE_FALSE);
  const exercise: TExercise = {
    id,
    type: TrackType.EXERCISE,
    name: `Exercise ${id}`,
    time: 10,
    ...(useRepetitions ? { repetitions: generateRandomRepetitions() } : {}),
  };

  return exercise;
};

export const createMockTracks = (tracksToCreate: number): Track[] => {
  const tracks: Track[] = [];

  while (tracks.length < tracksToCreate) {
    const id = `${generateRandomNumber()}`;
    const useCircuit = getRandomElementFromArray(TRUE_FALSE);
    const useBreak = getRandomElementFromArray(TRUE_FALSE);

    if (useCircuit) {
      tracks.push({
        id,
        type: TrackType.CIRCUIT,
        name: `Workout ${id}`,
        exercisesAndRecoveries: [createExercise()],
      });
    } else if (useBreak) {
      tracks.push({
        id,
        type: TrackType.RECOVERY,
        time: 10,
      });
    } else {
      tracks.push(createExercise());
    }
  }

  return tracks;
};

export const createMockWorkout = (): IWorkout => {
  const id = `${generateRandomNumber()}`;

  return {
    id,
    name: `Workout ${id}`,
    tracks: createMockTracks(10),
  };
};

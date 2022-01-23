import {
  TExercise,
  Track,
  IWorkout,
  TrackType,
} from "../../../modules/workout/types";

export const generateRandomNumber = () => Math.ceil(Math.random() * 1000);
export const getRandomElementFromArray = (array: any[]): any =>
  array[Math.floor(Math.random() * array.length)];
export const getRandomNumberInRange = (
  upperLimit: number = 10,
  lowerLimit: number = 1
) => Math.floor(Math.random() * upperLimit) + lowerLimit;

export const TRUE_FALSE = [true, false];

export const createExercise = (): TExercise => {
  const id = `${generateRandomNumber()}`;
  const useRepetitions = getRandomElementFromArray(TRUE_FALSE);
  const exercise: TExercise = {
    id,
    type: TrackType.EXERCISE,
    name: `Exercise ${id}`,
    time: getRandomNumberInRange(30),
    ...(useRepetitions ? { repetitions: getRandomNumberInRange() } : {}),
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
      const exercisesNumber = getRandomNumberInRange(5, 2);
      const rounds = getRandomNumberInRange(3, 2);
      const exercisesAndRecoveries = [];

      console.log({ exercisesNumber });

      for (let i = 0; i < exercisesNumber; i++) {
        exercisesAndRecoveries.push(createExercise());
      }

      tracks.push({
        id,
        type: TrackType.CIRCUIT,
        name: `Workout ${id}`,
        exercisesAndRecoveries: exercisesAndRecoveries,
        rounds,
      });
    } else if (useBreak) {
      tracks.push({
        id,
        type: TrackType.RECOVERY,
        time: getRandomNumberInRange(20),
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

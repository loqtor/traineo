import { Response } from "express";

export interface IException {
  code: string; // @TODO: This could be typed stronger.
  message?: string;
  error?: any;
}

export const handleException = (
  res: Response,
  exception: IException,
  status?: number
) => {
  // @TODO: ADD EXCEPTION TRACKING, PLEASE.
  return res.status(status || 500).json({ error: exception });
};

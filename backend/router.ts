import { Router } from "express";
// import { login } from "./middleware/session";
// import env from "./util/env";
import workoutRouter from "./modules/workout/routes";

export const initRoutes = (router: Router) => {
  workoutRouter.setRoutes(router);

  // if (env.isDevelopment) {
  //   router.post("/login", (req: Request, res: Response) => login(req, res));
  // }
};

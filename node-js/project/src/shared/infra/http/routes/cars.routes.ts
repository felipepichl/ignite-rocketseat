import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { enshureAdmin } from "../middlewares/enshureAdmin";
import { enshureAuthenticated } from "../middlewares/enshureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
  "/",
  enshureAuthenticated,
  enshureAdmin,
  createCarController.handle
);

export { carsRoutes };

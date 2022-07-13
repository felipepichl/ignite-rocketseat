import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarController";

import { enshureAdmin } from "../middlewares/enshureAdmin";
import { enshureAuthenticated } from "../middlewares/enshureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();

carsRoutes.post(
  "/",
  enshureAuthenticated,
  enshureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarController.handle);

export { carsRoutes };

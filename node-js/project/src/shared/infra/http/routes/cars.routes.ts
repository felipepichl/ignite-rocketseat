import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarController";

import { enshureAdmin } from "../middlewares/enshureAdmin";
import { enshureAuthenticated } from "../middlewares/enshureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const createCarSpeficificationController =
  new CreateCarSpecificationController();
const listAvailableCarController = new ListAvailableCarController();

carsRoutes.post(
  "/",
  enshureAuthenticated,
  enshureAdmin,
  createCarController.handle
);

carsRoutes.post(
  "/specifications/:id",
  enshureAuthenticated,
  enshureAdmin,
  createCarSpeficificationController.handle
);

carsRoutes.get("/available", listAvailableCarController.handle);

export { carsRoutes };

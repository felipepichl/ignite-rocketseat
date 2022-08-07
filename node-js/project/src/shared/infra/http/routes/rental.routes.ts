import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRentals/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

import { enshureAuthenticated } from "../middlewares/enshureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post("/", enshureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  enshureAuthenticated,
  devolutionRentalController.handle
);

export { rentalRoutes };

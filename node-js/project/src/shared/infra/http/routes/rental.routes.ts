import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRentals/CreateRentalController";

import { enshureAuthenticated } from "../middlewares/enshureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", enshureAuthenticated, createRentalController.handle);

export { rentalRoutes };

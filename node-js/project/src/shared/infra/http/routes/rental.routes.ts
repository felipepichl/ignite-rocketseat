import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
// import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
// import { ListRentalByUserController } from "@modules/rentals/useCases/listRentalByUser/ListRentalByUserController";

import { enshureAuthenticated } from "../middlewares/enshureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
// const devolutionRentalController = new DevolutionRentalController();
// const listRentalByUserController = new ListRentalByUserController();

rentalRoutes.post("/", enshureAuthenticated, createRentalController.handle);
// rentalRoutes.post(
//   "/devolution/:id",
//   enshureAuthenticated,
//   devolutionRentalController.handle
// );
// rentalRoutes.get(
//   "/user",
//   enshureAuthenticated,
//   listRentalByUserController.handle
// );

export { rentalRoutes };

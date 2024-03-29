import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { Router } from "express";

import { enshureAdmin } from "../middlewares/enshureAdmin";
import { enshureAuthenticated } from "../middlewares/enshureAuthenticated";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post(
  "/",
  enshureAuthenticated,
  enshureAdmin,
  createSpecificationController.handle
);

export { specificationRoutes };

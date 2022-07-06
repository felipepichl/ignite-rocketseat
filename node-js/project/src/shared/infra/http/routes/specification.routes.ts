import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { enshureAuthenticated } from "../middlewares/enshureAuthenticated";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(enshureAuthenticated);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };

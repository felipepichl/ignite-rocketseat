import { Router } from "express";

import { enshureAuthenticated } from "../middlewares/enshureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(enshureAuthenticated);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };

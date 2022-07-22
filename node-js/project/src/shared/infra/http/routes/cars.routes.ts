import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImages/UploadCarImageController";

import { enshureAdmin } from "../middlewares/enshureAdmin";
import { enshureAuthenticated } from "../middlewares/enshureAuthenticated";

const carsRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const createCarSpeficificationController =
  new CreateCarSpecificationController();
const listAvailableCarController = new ListAvailableCarController();
const uploadCarImagesController = new UploadCarImageController();

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

carsRoutes.post(
  "/images/:id",
  enshureAuthenticated,
  enshureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

export { carsRoutes };

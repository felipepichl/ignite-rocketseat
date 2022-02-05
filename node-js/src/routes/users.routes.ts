import { Router } from "express";
import multer from "multer";

import { enshureAuthenticated } from "../middlewares/enshureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const upload = multer({
  dest: "./temp/avatar",
});

const createUsersController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUsersController.handle);

usersRoutes.patch(
  "/avatar",
  enshureAuthenticated,
  upload.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };

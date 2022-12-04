import { UsersRepository } from "@modules/accounts/infra/prisma/repositories/UsersRepository";
import { Request, Response, NextFunction } from "express";

import { AppError } from "@shared/errors/AppError";

async function enshureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.is_admin) {
    throw new AppError("User isn't an administrator");
  }

  return next();
}

export { enshureAdmin };

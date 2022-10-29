import { Request, Response, NextFunction } from "express";

import { UsersRepository } from "@modules/accounts/infra/prisma/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

async function enshureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User isn't an administrator");
  }

  return next();
}

export { enshureAdmin };

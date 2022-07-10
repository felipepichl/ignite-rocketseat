import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface ITokenPayload {
  sub: string;
}

export async function enshureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, "authConfig.jwt.secret");

    const { sub: user_id } = decoded as ITokenPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }
    request.user = {
      id: user_id,
    };

    console.log(user);

    return next();
  } catch {
    throw new AppError("Invalid JWT Token", 401);
  }
}

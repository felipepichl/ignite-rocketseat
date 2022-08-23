import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
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

  const userTokenRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { secret_refresh_token } = authConfig;

    const decoded = verify(token, secret_refresh_token);

    const { sub: user_id } = decoded as ITokenPayload;

    const user = await userTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError("User does not exists", 401);
    }
    request.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT Token", 401);
  }
}

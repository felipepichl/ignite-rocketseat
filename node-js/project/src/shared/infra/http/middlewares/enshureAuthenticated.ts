import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@config/auth";
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
    const { secret_token } = authConfig;

    const { sub: user_id } = verify(token, secret_token) as ITokenPayload;
    console.log(user_id);

    request.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT Token", 401);
  }
}

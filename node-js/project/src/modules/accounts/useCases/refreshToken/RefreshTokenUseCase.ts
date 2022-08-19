import { verify } from "jsonwebtoken";

interface IRequest {
  token: string;
}

class RefreshTokenUseCase {
  async execute({ token }: IRequest): Promise<void> {}
}

export { RefreshTokenUseCase };

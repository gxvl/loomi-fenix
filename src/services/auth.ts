import type { AxiosResponse } from "axios";
import api from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginApiResponse {
  statusCode: number;
  message: string;
  path: string;
  access_token: string;
}

/**
 * Função para realizar login.
 * Nota: Esta é uma implementação mockup que sempre envia credenciais fixas.
 * @param credentials - As credenciais do usuário (serão substituídas por valores fictícios que peguei no swagger).
 */
export const login = (data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<LoginApiResponse>> => {
  const mockCredentials = {
    email: "user@example.com",
    password: "string"
  };

  return api.post("/auth/login", mockCredentials);
};

export type UserPayload = {
  sub: number;
  email: string;
  role: string;
  iat?: number; //iat (issued at) = Timestamp de quando o token foi criado;
  exp?: number; //exp (expiration) = Timestamp de quando o token irá expirar;
};

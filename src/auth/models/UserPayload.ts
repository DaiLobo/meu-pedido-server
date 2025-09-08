export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  restaurants?: { id: string; name: string }[];
  iat?: number;
  exp?: number;
}

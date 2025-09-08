export interface UserFromJwt {
  id: string;
  name: string;
  email: string;
  restaurants?: { id: string; name: string }[];
}

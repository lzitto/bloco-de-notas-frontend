export interface User {
  id: string; // UUID
  email: string;
  passwordHash: string; // nunca guardamos a senha em texto puro
  createdAt: string; // ISO 8601
}

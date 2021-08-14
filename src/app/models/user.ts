export interface User {
  id: number;
  fullname: string;
  age: number;
  username: string;
  isAdmin: boolean;
}

export interface CreateUserModel {
  username?: string;
  password?: string;
  fullname?: string;
  age?: number;
  isAdmin?: boolean;
}

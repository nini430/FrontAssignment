export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

export type UserInput = Omit<User, 'id'>;
export interface ResponseSuccess<T> {
  success: boolean;
  data: T;
}

export interface UserInitialState {
  users: User[];
  statistics: UserStatistics;
  getAllUsers: () => Promise<void>;
  createNewUser: (input: User) => Promise<void>;
  updateUser: (input: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  getUserStatistics: () => Promise<void>;
}

export type UserStatistics = { type: string; value: string }[];

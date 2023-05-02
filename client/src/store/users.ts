import { create } from 'zustand';
import {
  ResponseSuccess,
  User,
  UserInitialState,
  UserStatistics,
} from '../types/users';
import {
  createNewUserRequest,
  deleteUserRequest,
  getAllUsersRequest,
  getUserStatisticsRequest,
  updateUserRequest,
} from '../api/users';

export const useUserStore = create<UserInitialState>((set) => ({
  users: [],
  statistics: [],
  getAllUsers: async () => {
    const res = await getAllUsersRequest();
    set({ users: res.data.data as ResponseSuccess<User[]>['data'] });
  },
  createNewUser: async (input: User) => {
    const res = await createNewUserRequest(input);
    const newUser = res.data.data as ResponseSuccess<User>['data'];
    set((store) => ({ users: [...store.users, newUser] }));
  },
  updateUser: async (input: User) => {
    const res = await updateUserRequest(input);
    const updatedUser = res.data.data as ResponseSuccess<User>['data'];
    set((store) => ({
      users: store.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    }));
  },
  deleteUser: async (id: number) => {
    await deleteUserRequest(id);
    set((store) => ({ users: store.users.filter((user) => user.id !== id) }));
  },
  getUserStatistics: async () => {
    const res = await getUserStatisticsRequest();
    set({
      statistics: res.data.data as ResponseSuccess<UserStatistics>['data'],
    });
  },
}));

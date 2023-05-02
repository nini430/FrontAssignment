import axiosApiInstance from '../config/axios';
import { User } from '../types/users';

export const getAllUsersRequest = () => axiosApiInstance.get('/users');
export const createNewUserRequest = (input: User) =>
  axiosApiInstance.post('/users', input);
export const updateUserRequest = (input: User) =>
  axiosApiInstance.put(`/users/${input.id}`, input);
export const deleteUserRequest = (id: number) =>
  axiosApiInstance.delete(`/users/${id}`);
export const getUserStatisticsRequest = () =>
  axiosApiInstance.get('/users/statistics');

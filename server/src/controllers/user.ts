import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  findUserLocation,
  getAllUsers,
  getUsersPercentageForCountries,
  saveUsers,
} from '../services/users';
import { UserInput } from '../types/users';
import { NextFunction } from 'express-serve-static-core';
import ErrorResponse from '../utils/ErrorResponse';

export const fetchAllUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const users = getAllUsers() as string;
    return res.status(200).json({ success: true, data: users });
  }
);

export const createNewUser = asyncHandler(
  async (req: Request<{}, {}, UserInput>, res: Response) => {
    let users = getAllUsers();
    const userIndex = users.length;
    users = [...users, req.body];
    saveUsers(users);
    return res.status(201).json({ success: true, data: users[userIndex] });
  }
);

export const updateUser = asyncHandler(
  async (
    req: Request<{ id: string }, {}, UserInput>,
    res: Response,
    next: NextFunction
  ) => {
    let users = getAllUsers();
    const userLocation = findUserLocation(+req.params.id);
    if (userLocation === -1) {
      return next(new ErrorResponse('User Not Found', 404));
    }
    users = users.map((user: UserInput) =>
      user.id === +req.params.id ? req.body : user
    );
    saveUsers(users);
    return res.status(200).json({ success: true, data: users[userLocation] });
  }
);

export const deleteUser = asyncHandler(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    let users = getAllUsers();
    const userLocation = findUserLocation(+req.params.id);
    if (userLocation === -1) {
      return next(new ErrorResponse('User Not Found', 404));
    }
    users = users.filter((user: UserInput) => user.id !== +req.params.id);
    saveUsers(users);
    return res.status(200).json({ success: true, msg: 'User Deleted' });
  }
);

export const getUserStatisticForCountry = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const statisticData = getUsersPercentageForCountries();
    return res.status(200).json({ success: true, data: statisticData });
  }
);

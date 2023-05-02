import fs from 'fs';
import path from 'path';
import { UserInput } from '../types/users';

const dataPath = path.join(__dirname, '..', '..', 'data', 'user_data.json');

export const getAllUsers = () => {
  const users = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(users);
};

export const saveUsers = (input: UserInput[]) => {
  const jsonData = JSON.stringify(input);
  fs.writeFileSync(dataPath, jsonData);
};

export const findUserLocation = (id: number) => {
  const users = getAllUsers();
  return users.findIndex((user: UserInput) => user.id === id);
};

export const getUsersPercentageForCountries = () => {
  const users = getAllUsers();
  const populationPerCountry = [] as { type: string; value: number }[];
  users.forEach((user: UserInput) => {
    const countryIndex = populationPerCountry.findIndex(
      (item) => item.type === user.address.city
    );
    if (countryIndex !== -1) {
      populationPerCountry[countryIndex] = {
        ...populationPerCountry[countryIndex],
        value: populationPerCountry[countryIndex].value + 1,
      };
    } else {
      populationPerCountry.push({ type: user.address.city, value: 1 });
    }
  });
  const populationPercentage = populationPerCountry.map((item) => ({
    ...item,
    value: +((item.value / users.length) * 100).toFixed(2),
  }));
  return populationPercentage;
};

import fs from 'fs';
import path from 'path';
import { UserInput } from '../types/users';

const dataPath = path.join(__dirname, '..', '..', 'data', 'user_data.json');


export const getAllUsers=()=>{
  const users=fs.readFileSync(dataPath,'utf-8');
  return JSON.parse(users);
}

export const saveUsers=(input:UserInput[])=>{
  const jsonData=JSON.stringify(input);
  fs.writeFileSync(dataPath,jsonData);
}

export const findUserLocation=(id:number)=>{
  const users=fs.readFileSync(dataPath,'utf-8');
  return JSON.parse(users).findIndex((user:UserInput)=>user.id===id);
}



import { Model } from "mongoose";

import { Users } from "./users.model";
export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};
export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};
export type TUsers = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrders[];
};

// Create a Static  model
export interface UserSchemaModel extends Model<TUsers> {
  isUserIdExits(userId: string): Promise<TUsers | null>;
}

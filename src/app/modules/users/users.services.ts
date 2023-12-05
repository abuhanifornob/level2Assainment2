import { Error } from "mongoose";

import e from "express";

import { object } from "zod";

import { TOrders, TUsers } from "./users.interface";
import { Users } from "./users.model";

const createUserIntoDB = async (user: TUsers): Promise<TUsers> => {
  const result = await Users.create(user);
  const responseUser = {
    userId: result.userId,
    username: result.username,
    fullName: result.fullName,
    age: result.age,
    email: result.email,
    isActive: result.isActive,
    hobbies: result.hobbies,
    address: result.address,
  };
  return responseUser;
};

const getAllUsersFromDB = async (): Promise<TUsers[]> => {
  const result = await Users.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 }
  );
  return result;
};
const getSingleUserFromBD = async (userId: number): Promise<TUsers | null> => {
  if (await Users.isUserIdExits(userId)) {
    const result = await Users.findOne(
      { userId: { $eq: userId } },
      { password: 0, orders: 0, _id: 0 }
    );
    return result;
  } else {
    throw new Error("Data Not Found");
  }
};

const updateUserFromDB = async (userId: number, userData: TUsers) => {
  if (await Users.isUserIdExits(userId)) {
    console.log("user id inside the ", userId);
    console.log("user id form Inside Update ", userData);

    const result = await Users.updateOne({ userId }, userData);

    const responseUserUpdate = {
      userId: userData?.userId,
      username: userData?.username,
      fullName: userData?.fullName,
      age: userData?.age,
      email: userData?.email,
      isActive: userData?.isActive,
      hobbies: userData?.hobbies,
      address: userData?.address,
    };

    return responseUserUpdate;
  } else {
    throw new Error("Data Not Found");
  }
};
const deleteSingleUseFromDB = async (userId: number) => {
  if (await Users.isUserIdExits(userId)) {
    const result = await Users.deleteOne({ userId });
    return result;
  } else {
    throw new Error("Data Not Found");
  }
};

const updateOrdersIntoDB = async (userId: number, orders: TOrders) => {
  if (await Users.isUserIdExits(userId)) {
    const result = await Users.updateOne(
      { userId: userId },
      {
        $push: { orders: orders },
      }
    );

    return result;
  } else {
    throw new Error("Data Not Found");
  }
};

const getUserOrdersFromDB = async (userId: number) => {
  // Check This User id Exits in Our Existing  Model
  if (await Users.isUserIdExits(userId)) {
    const result = await Users.findOne(
      { userId: { $eq: userId } },
      { orders: 1, _id: 0 }
    );
    return result;
  } else {
    throw new Error("Data Not Found");
  }
};
const getUserOrderPriceFromDB = async (userId: number) => {
  // Check This User id Exits in Our Existing  Model
  if (await Users.isUserIdExits(userId)) {
    const user = await Users.findOne({ userId: { $eq: userId } });
    const userOrders = user?.orders;
    const totalPrice = userOrders?.reduce((sum, order) => {
      return sum + order.price * order.quantity;
    }, 0);

    return totalPrice?.toFixed(2);
  } else {
    throw new Error("Data Not Found");
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromBD,
  updateUserFromDB,
  deleteSingleUseFromDB,
  updateOrdersIntoDB,
  getUserOrdersFromDB,
  getUserOrderPriceFromDB,
};

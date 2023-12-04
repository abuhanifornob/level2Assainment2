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

const getUsersIntoDB = async () => {
  //   const result = await Users.find({}).select("userId username");
  const result = await Users.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 }
  );
  return result;
};
const getSingleUserIntoBD = async (userId: number) => {
  if (await Users.isUserIdExits(userId)) {
    const result = await Users.findOne(
      { userId: { $eq: userId } },
      { password: 0, orders: 0 }
    );
    return result;
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
  if (await Users.isUserIdExits(userId)) {
    console.log("inside exits ", userId);
    const result = await Users.findOne(
      { userId: { $eq: userId } },
      { orders: 1, _id: 0 }
    );
    return result;
  } else {
    throw new Error("Data Not Found");
  }
};

export const UserServices = {
  createUserIntoDB,
  getUsersIntoDB,
  getSingleUserIntoBD,
  deleteSingleUseFromDB,
  updateOrdersIntoDB,
  getUserOrdersFromDB,
};

import { Request, Response } from "express";

import { UserServices } from "./users.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UserServices.createUserIntoDB(user);
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User not found",
      error,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUsersIntoDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User not found",
      error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserIntoBD(userId);

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error,
    });
  }
};
export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
};

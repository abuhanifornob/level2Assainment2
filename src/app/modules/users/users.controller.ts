import { Request, Response } from "express";

import { UserServices } from "./users.services";
import usersValidationSchema from "./users.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body; // get informaton from  request body.
    const zodUserData = usersValidationSchema.parse(user); // Validation with ZoD

    const result = await UserServices.createUserIntoDB(zodUserData); // create a new user into DB
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
    let { userId } = req.params;
    const userIdNu = Number(userId);

    const result = await UserServices.getSingleUserIntoBD(Number(userIdNu));

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.deleteSingleUseFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = req.body;

    const result = await UserServices.updateOrdersIntoDB(
      Number(userId),
      orders
    );
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log("getOrder User id is:", userId);
    const result = await UserServices.getUserOrdersFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
  deleteSingleUser,
  updateOrder,
  getOrders,
};

import { TUsers } from "./users.interface";
import { Users } from "./users.model";

const createUserIntoDB = async (user: TUsers) => {
  const result = await Users.create(user);
  return result;
};

const getUsersIntoDB = async () => {
  //   const result = await Users.find({}).select("userId username");
  const result = await Users.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 }
  );
  return result;
};
const getSingleUserIntoBD = async (userId: string) => {
  const result = await Users.findOne(
    { userId: { $eq: userId } },
    { password: 0, orders: 0 }
  );
  return result;
};
export const UserServices = {
  createUserIntoDB,
  getUsersIntoDB,
  getSingleUserIntoBD,
};

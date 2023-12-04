import { Schema, model, connect, Number } from "mongoose";

import { config } from "dotenv";

import bcrypt from "bcrypt";

import {
  TAddress,
  TFullName,
  TOrders,
  TUsers,
  UserSchemaModel,
} from "./users.interface";

// Create Full Namme Schema
const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, "Please tell us your First Name"],
  },
  lastName: {
    type: String,
    required: [true, "Please tell us your Last Name"],
  },
});

// Define Address Schema
const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, "Please tell us your Street"],
  },
  city: {
    type: String,
    required: [true, "Please tell us your City"],
  },
  country: {
    type: String,
    required: [true, "Please tell us your Country"],
  },
});

// oders Schema Define
const orderSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: [true, "Please tell us your Product Name"],
  },
  price: {
    type: Number,
    required: [true, "Please tell us your Product Price"],
  },
  quantity: {
    type: Number,
    required: [true, "Please tell us your Product Quntity"],
  },
});

// Define Users Schema
const usersSchema = new Schema<TUsers, UserSchemaModel>({
  userId: {
    type: Number,
    required: [true, "Please tell us your User Id"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please tell us your User Name"],
    unique: true,
    min: 5,
    max: 20,
  },
  password: {
    type: String,
    required: [true, "Please tell us your Password"],
    min: 5,
  },
  fullName: {
    type: fullNameSchema,
    required: [true, "Please tell us your Full Name"],
  },
  age: {
    type: Number,
    required: [true, "Please tell us your Age"],
  },
  email: {
    type: String,
    required: [true, "Please tell us your Email"],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
  },
  isActive: {
    type: Boolean,
    required: [
      true,
      "Please tell us you Active or not . if you active then true otherwise false",
    ],
  },
  hobbies: {
    type: [String],
    required: [true, "Please tell us your hobbies"],
  },
  address: addressSchema,
  orders: {
    type: [orderSchema],
  },
});

// This pree Middlewear make hash token .
usersSchema.pre("save", async function (next) {
  const user = this; // this is current document
  const hash = await bcrypt.hash(user.password, 12); // 12 is hash slad
  user.password = hash;
  next();
});

// this pree middleware make password to empty String
usersSchema.post("save", async function (doc, next) {
  doc.password = "";
  next;
});

// create static for check uese exits
usersSchema.statics.isUserIdExits = async function (userId: number) {
  const userIdExits = await Users.findOne({ userId }); // Check this user id avelavel or not
  return userIdExits;
};

//  Ouer Users Model ..........
export const Users = model<TUsers, UserSchemaModel>(
  "UserInformation",
  usersSchema
);

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

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
const orderSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: true,
  },
  price: { type: Number, required: true },
  quantity: {
    type: Number,
    required: true,
  },
});

const usersSchema = new Schema<TUsers, UserSchemaModel>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
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

export const Users = model<TUsers, UserSchemaModel>(
  "UserInformation",
  usersSchema
);

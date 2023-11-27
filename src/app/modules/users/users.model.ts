import { Schema, model, connect } from "mongoose";

import { TAddress, TFullName, TOrders, TUsers } from "./users.interface";

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
  street: String,
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
  productName: String,
  price: Number,
  quantity: Number,
});

const usersSchema = new Schema<TUsers>({
  userId: {
    type: String,
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

export const Users = model<TUsers>("UserInformation", usersSchema);

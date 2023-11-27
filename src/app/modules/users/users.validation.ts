import { z } from "zod";

// Define Zod schema for fullName
const fullNameValidationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

// Define Zod schema for address
const addressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

// Define Zod schema for order
const orderValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number(),
  quantity: z.number(),
});

// Define Zod schema for users
const usersValidationSchema = z.object({
  userId: z.string().min(1),
  username: z.string().min(5).max(20),
  password: z.string().min(5),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().min(1).email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1)),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});

export default usersValidationSchema;
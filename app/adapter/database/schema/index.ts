import { z } from "zod";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const UserModelScalarFieldEnumSchema = z.enum([
  "id",
  "email",
  "userType",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "passwordHash",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const UserTypeSchema = z.enum(["USER", "ADMIN"]);

export type UserTypeType = `${z.infer<typeof UserTypeSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER MODEL SCHEMA
/////////////////////////////////////////

export const UserModelSchema = z.object({
  userType: UserTypeSchema,
  id: z.string().uuid(),
  email: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  passwordHash: z.string(),
});

export type UserModel = z.infer<typeof UserModelSchema>;

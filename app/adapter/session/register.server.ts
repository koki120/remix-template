import { db } from "~/adapter/database/db.server";
import bcrypt from "bcryptjs";

export const register = async (password: string, email: string) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.userModel.create({
    select: { id: true },
    data: { passwordHash, email },
  });
  return user.id;
};

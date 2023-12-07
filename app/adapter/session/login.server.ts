import { db } from "~/adapter/database/db.server";
import bcrypt from "bcryptjs";

export const login = async (email: string, password: string) => {
  const user = await db.userModel.findUnique({
    select: { id: true, passwordHash: true },
    where: { email },
  });
  if (!user) {
    return null;
  }

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) {
    return null;
  }
  return user.id;
};

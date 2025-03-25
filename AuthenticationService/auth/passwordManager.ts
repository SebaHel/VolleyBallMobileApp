import bcrypt from "bcrypt";

const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
export class Password {
  static hashPassword = async (password: string): Promise<string> => {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error("Error hashing password: " + error);
    }
  };

  static comparePassword = async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (error) {
      throw new Error("Error comparing password: " + error);
    }
  };
}

import jwt from "jsonwebtoken";

export const checkAuth = async (
  Token: string
): Promise<{ id: string } | void> => {
  const token = Token.trim();
  return new Promise((resolve, reject) => {
    jwt.verify(token, String(process.env.JWTKEY), (err, payload) => {
      if (err || !payload || typeof payload !== "object") {
        return reject("Invalid token");
      }

      const { userId }: any = payload;
      resolve({ id: userId });
    });
  });
};

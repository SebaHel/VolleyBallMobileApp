import { pool } from "../DB/database";
import { Password } from "../auth/passwordManager";

interface User {
  email: string;
  password: string;
}

export const addUser = async (
  user: User
): Promise<{ id: number; email: string }> => {
  const { email, password } = user;
  const hashedPassword = await Password.hashPassword(password);
  try {
    const query = `
          INSERT INTO users (email, password)
          VALUES ($1, $2)
          RETURNING id, email;
        `;
    const values = [email, hashedPassword];

    const result = await pool.query(query, values);

    return await result.rows[0];
  } catch (err) {
    throw new Error("Bad Request");
  }
};

export function findUserByEmail(
  email: string
): Promise<{ id: number; email: string; password: string } | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "SELECT * FROM users WHERE email = $1;";

      const result = await pool.query(query, [email]);

      if (result.rows.length > 0) {
        resolve(result.rows[0]);
      } else {
        resolve(null);
      }
    } catch (err) {
      reject(new Error("Bad request error"));
    }
  });
}
export function findUserById(
  id: string
): Promise<{ id: string; email: string; password: string } | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "SELECT * FROM users WHERE id = $1;";

      const result = await pool.query(query, [id]);

      if (result.rows.length > 0) {
        resolve(result.rows[0]);
      } else {
        resolve(null);
      }
    } catch (err) {
      reject(new Error("Bad request error"));
    }
  });
}

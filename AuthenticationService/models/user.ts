import { pool } from "../DB/database";
import { Password } from "../auth/passwordManager";
import { v4 as uuidv4 } from "uuid";

interface User {
  email: string;
  password: string;
}

export const addUser = async (
  user: User
): Promise<{ id: string; email: string }> => {
  const userId = uuidv4();
  const { email, password } = user;
  const hashedPassword = await Password.hashPassword(password);
  try {
    const query = `
          INSERT INTO users (id,email, password)
          VALUES ($1, $2, $3)
          RETURNING id, email;
        `;
    const values = [userId, email, hashedPassword];

    const result = await pool.query(query, values);

    return await result.rows[0];
  } catch (err) {
    throw new Error("Query Bad Request");
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

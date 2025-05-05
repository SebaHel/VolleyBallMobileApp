import { pool } from "../DB/database";

type position =
  | "Setter"
  | "Outside_hitter"
  | "Opposite"
  | "Middle_blocker"
  | "Libero";

export const CreateUserProfile = async (
  user_id: string,
  name: string,
  surname: string,
  position: position
): Promise<void> => {
  try {
    const query = `
              INSERT INTO user_profile (user_id, name, surname, position)
       VALUES ($1, $2, $3, $4);
            `;
    const values = [user_id, name, surname, position];

    await pool.query(query, values);
  } catch (err) {
    throw new Error("Query Bad Request");
  }
};

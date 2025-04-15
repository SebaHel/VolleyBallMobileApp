import { pool } from "../DB/database";

export const addGroup = async (
  name: string
): Promise<{ id: string } | void> => {
  try {
    const query = `
        INSERT INTO groups ( name)
        VALUES ($1)
        RETURNING id;
     `;
    const values = [name];

    const result = await pool.query(query, values);

    return await result.rows[0];
  } catch (err) {
    throw new Error("Query Bad Request");
  }
};

export const addGroupMember = async (
  groupId: string,
  userId: string,
  role: "player" | "coach"
): Promise<{ id: string } | void> => {
  try {
    const query = `
      INSERT INTO group_members ( group_id, user_id, role)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const values = [groupId, userId, role];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err: any) {
    console.error("DB error (addGroupMember):", err.message);
    throw new Error("Query Bad Request");
  }
};

export const isCoachofGroup = async (
  userId: string,
  group_id: string
): Promise<boolean> => {
  try {
    const query = `
      SELECT user_id FROM group_members 
      WHERE user_id = $1 AND group_id = $2 AND role = 'coach';
    `;
    const values = [userId, group_id];

    const result = await pool.query(query, values);
    return result.rowCount! > 0;
  } catch (err: any) {
    console.error("DB error (addGroupMember):", err.message);
    throw new Error("Query Bad Request");
  }
};

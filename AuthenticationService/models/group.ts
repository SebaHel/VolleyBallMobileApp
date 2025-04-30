import { pool } from "../DB/database";

export const addGroup = async (
  name: string,
  selectedColor: string
): Promise<{ id: string } | void> => {
  try {
    const query = `
        INSERT INTO groups (name, color)
        VALUES ($1, $2)
        RETURNING id,color;
     `;
    const values = [name, selectedColor];

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

export function findGroupById(
  group_id: string
): Promise<{ name: string } | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "SELECT name FROM groups WHERE id = $1;";

      const result = await pool.query(query, [group_id]);

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

export function findAllUserGroups(
  user_id: string
): Promise<{ group_id: string; name: string; color: string }[] | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT gm.group_id, g.name, g.color 
      FROM group_members gm 
      JOIN groups g on gm.group_id = g.id 
      WHERE gm.user_id = $1;`;
      const results = await pool.query(query, [user_id]);
      if (results.rows.length > 0) {
        resolve(results.rows);
      } else {
        resolve(null);
      }
    } catch (err) {
      console.log(err);
      reject(new Error("Bad Request Error"));
    }
  });
}

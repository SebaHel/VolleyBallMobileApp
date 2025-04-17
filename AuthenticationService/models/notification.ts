import { pool } from "../DB/database";
import { NotificationType, Notification } from "../types/notification";

export const addInviteNotification = async (
  user_id: string,
  type: NotificationType,
  message: string,
  data?: any
): Promise<Notification | void> => {
  const query = `
    INSERT INTO notifications (user_id, type, message, data)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [user_id, type, message, data ? JSON.stringify(data) : null];

  await pool.query(query, values);
};

export const invitationExist = async (
  user_id: string,
  data: { Name: string; InvitedBy: string }
): Promise<Notification | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `
    SELECT * FROM notifications
    WHERE user_id = $1
    AND type = 'invite'
    AND data @> $2::jsonb
    LIMIT 1;
  `;
      const values = [user_id, JSON.stringify(data)];

      const result = await pool.query(query, values);
      if (result.rows.length > 0) {
        resolve(result.rows[0]);
      } else {
        resolve(null);
      }
    } catch (err) {
      reject(new Error("Bad request error"));
    }
  });
};

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

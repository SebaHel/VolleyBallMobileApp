export type NotificationType = "invite" | "event" | "comment";

export type NotificationStatus = "pending" | "seen" | "accepted" | "rejected";

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  status: NotificationStatus;
  message?: string;
  data?: any;
  created_at: string;
  read_at?: string;
}

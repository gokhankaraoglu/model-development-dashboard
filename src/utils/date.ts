import dayjs from "dayjs";

export const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  return dayjs(dateString).format("MMM D, YYYY");
};

export const formatTime = (timestamp: string) => {
  return dayjs(timestamp).format("HH:mm");
};

export const formatRelativeDate = (dateString: string) => {
  const date = dayjs(dateString).startOf("day");
  const today = dayjs().startOf("day");
  const yesterday = today.subtract(1, "day").startOf("day");

  if (date.isSame(today, "day")) {
    return "Today";
  } else if (date.isSame(yesterday, "day")) {
    return "Yesterday";
  } else {
    return date.format("MMM D");
  }
};

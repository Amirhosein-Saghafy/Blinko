export const formatMessageTime = function (dateString) {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatTimeAgo = function (dateString) {
  if (!dateString) return;

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return "Just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }

  if (diffHours < 24) {
    const hours = diffHours;
    let result = "";
    if (hours > 0) result += `${hours} hour${hours === 1 ? "" : "s"}`;
    return `${result} ago`;
  }

  if (diffDays <= 3) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  return `${day} ${month}`;
};

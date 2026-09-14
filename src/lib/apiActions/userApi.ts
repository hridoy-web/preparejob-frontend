// 1. Toggle bookmark (Add or Remove question)
export const toggleBookmark = async (questionId: string) => {
  const res = await fetch("/api/user/bookmark", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ questionId }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Failed to toggle bookmark");
  }

  return data;
};

// 2. Fetch all bookmarked questions for the logged-in user
export const getBookmarkedQuestions = async () => {
  const res = await fetch("/api/user/bookmark", {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch bookmarks");
  }

  return data;
};

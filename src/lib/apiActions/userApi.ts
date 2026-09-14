const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000/api/v1";

/**
 * 1. PATCH /user/bookmark -> toggleBookmark
 */
export const toggleBookmark = async (questionId: string, userId?: string) => {
  const res = await fetch(`${API_BASE_URL}/user/bookmark`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ questionId, userId }),
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

  return res.json();
};

/**
 * 2. GET /user/bookmarks/:userId -> getUserBookmarks
 */
export const getUserBookmarks = async (userId: string) => {
  const res = await fetch(`${API_BASE_URL}/user/bookmarks/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch user bookmarks");
  }

  return res.json();
};

/**
 * 3. GET /user/liked-blogs/:userId -> getUserLikedBlogs
 */
export const getUserLikedBlogs = async (userId: string) => {
  const res = await fetch(`${API_BASE_URL}/user/liked-blogs/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch liked blogs");
  }

  return res.json();
};

/**
 * 4. GET /user/commented-blogs/:userId -> getUserCommentedBlogs
 */
export const getUserCommentedBlogs = async (userId: string) => {
  const res = await fetch(`${API_BASE_URL}/user/commented-blogs/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch commented blogs");
  }

  return res.json();
};

/**
 * GET /user/stats/:userId -> getUserStats
 */
export const getUserStats = async (userId: string) => {
  const res = await fetch(`${API_BASE_URL}/user/stats/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch user stats");
  }

  return res.json();
};

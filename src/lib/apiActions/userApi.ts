// Calls our internal Next.js API route to completely bypass CORS
export const toggleBookmark = async (questionId: string) => {
  const res = await fetch("/api/user/bookmark", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ questionId }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to toggle bookmark");
  }

  return res.json();
};
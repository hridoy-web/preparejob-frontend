const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000/api/v1";

// 1. Create Blog (Admin Dashboard)
export const createBlog = async (formData: FormData) => {
  const res = await fetch(`${BASE_URL}/blogs`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create blog");
  return res.json();
};

// 2. Fetch All Blogs with Pagination & Filters (User Website & Admin Dashboard)
export const getAllBlogs = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: "createdAt" | "title";
  order?: "asc" | "desc";
}) => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.search) queryParams.append("search", params.search);
  if (params?.category) queryParams.append("category", params.category);
  if (params?.sort) queryParams.append("sort", params.sort);
  if (params?.order) queryParams.append("order", params.order);

  const res = await fetch(`${BASE_URL}/blogs?${queryParams.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

// 3. Fetch Single Blog by Slug (User Single Blog Page)
export const getBlogBySlug = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/blogs/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Blog not found");
  return res.json();
};

// 4. Update Blog (Admin Edit Blog Form)
export const updateBlog = async (id: string, formData: FormData) => {
  const res = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update blog");
  return res.json();
};

// 5. Delete Blog (Admin Dashboard)
export const deleteBlog = async (id: string) => {
  const res = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete blog");
  return res.json();
};

// 6. Toggle Like (User Website)
export const toggleLikeBlog = async (id: string, userId: string) => {
  const res = await fetch(`${BASE_URL}/blogs/${id}/like`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) throw new Error("Failed to toggle like");
  return res.json();
};

// 7. Add Comment (User Website Comment Box)
export const addComment = async (
  id: string,
  commentData: { userId: string; text: string }
) => {
  const res = await fetch(`${BASE_URL}/blogs/${id}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
  });
  if (!res.ok) throw new Error("Failed to add comment");
  return res.json();
};

// 8. Delete Comment (User & Admin Dashboard)
export const deleteComment = async (id: string, commentId: string) => {
  const res = await fetch(`${BASE_URL}/blogs/${id}/comment/${commentId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete comment");
  return res.json();
};
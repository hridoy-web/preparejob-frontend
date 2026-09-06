const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000/api/v1";

// 1. Get Admin Dashboard Stats
export const getAdminStats = async () => {
  const res = await fetch(`${BASE_URL}/admin/stats`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch admin statistics");
  return res.json();
};

// 2. Get All Users
export const getAllUsers = async (params?: { page?: number; limit?: number }) => {
  const query = new URLSearchParams();
  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());

  const res = await fetch(`${BASE_URL}/admin/users?${query.toString()}`, {
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to fetch users");
  return data;
};

// 3. Toggle User Status
export const toggleUserStatus = async (id: string, adminId?: string) => {
  const res = await fetch(`${BASE_URL}/admin/users/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to update user status");
  return data;
};

// 4. Delete User Account
export const deleteUser = async (id: string, adminId?: string) => {
  const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adminId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed to delete user");
  return data;
};
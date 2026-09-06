const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000/api/v1";

// 1. Find all questions for Explore page and admin dashboard
export const getAllQuestions = async (params?: { page?: number; limit?: number; technology?: string; difficulty?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());
    if (params?.technology) query.append("technology", params.technology);
    if (params?.difficulty) query.append("difficulty", params.difficulty);

    const res = await fetch(`${BASE_URL}/questions?${query.toString()}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch questions");
    return res.json();
};

// 2. Single questions find for Explore page
export const getQuestionById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/questions/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch question detail");
    return res.json();
};

// 3. New Questions Create for Admin Dashboard
export const createQuestion = async (data: Record<string, unknown>) => {
    const res = await fetch(`${BASE_URL}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create question");
    return res.json();
};

// 4. Questions Update for Admin Dashboard
export const updateQuestion = async (id: string, data: Record<string, unknown>) => {
    const res = await fetch(`${BASE_URL}/questions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update question");
    return res.json();
};

//5. Delete Questions for Admin Dashboard
export const deleteQuestion = async (id: string) => {
    const res = await fetch(`${BASE_URL}/questions/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete question");
    return res.json();
};
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000/api/v1";

interface ApiResponse<T = unknown> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

export const createBlogApi = async (formdata: FormData): Promise<ApiResponse> => {

    const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: "POST",
        body: formdata,
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to create blog")
    }

    return result;
};

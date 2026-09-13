"use server";

import { revalidatePath } from "next/cache";
import {
  toggleLikeBlog,
  addComment as addCommentApi,
  deleteComment as deleteCommentApi,
} from "@/lib/apiActions/blogsApi";

export async function toggleLikeAction(blogId: string, userId: string, slug: string) {
  try {
    const res = await toggleLikeBlog(blogId, userId);
    revalidatePath("/blog", "layout");
    return res;
  } catch (error) {
    console.error("Server Action Toggle Like Error:", error);
    throw new Error("Failed to toggle like");
  }
}

export async function addCommentAction(
  blogId: string,
  slug: string,
  commentData: { userId: string; userName: string; commentText: string; userImage?: string }
) {
  try {
    const res = await addCommentApi(blogId, commentData);
    revalidatePath("/blog", "layout");
    return res;
  } catch (error) {
    console.error("Server Action Add Comment Error:", error);
    throw new Error("Failed to add comment");
  }
}

export async function deleteCommentAction(
  blogId: string,
  commentId: string,
  userId: string,
  slug: string
) {
  try {
    const res = await deleteCommentApi(blogId, commentId, userId);
    revalidatePath("/blog", "layout");
    return res;
  } catch (error) {
    console.error("Server Action Delete Comment Error:", error);
    throw new Error("Failed to delete comment");
  }
}
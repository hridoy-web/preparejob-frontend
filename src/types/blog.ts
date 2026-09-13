export interface BlogComment {
  _id?: string;
  userId: string;
  text: string;
  createdAt?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  bannerImage?: string | { url?: string; secure_url?: string };
  category: string;
  readTime?: string;
  likes?: string[];
  comments?: BlogComment[];
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}
"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { PostType } from "../types/type";

// バリデーションスキーマ
const signupSchema = z.object({
  username: z.string().min(1, "名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上必要です"),
});

const loginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上必要です"),
});

// APIクライアントの型定義
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type RequestOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
};

// プライベートなAPIクライアント関数
async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    method: options.method || "GET",
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...(options.body && { body: JSON.stringify(options.body) }),
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || `API request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

// ログインアクション
export async function loginAction(formData: FormData) {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const validatedFields = loginSchema.parse(rawFormData);
    const data = await apiClient<{ token: string }>("/api/auth/login", {
      method: "POST",
      body: validatedFields,
    });
    return { success: true, token: data.token };
  } catch (error: any) {
    console.log(error);
    return { success: false, error: error.message };
  }
}

// サインアップアクション
export async function handleSignup(formData: FormData) {
  const rawFormData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const validatedFields = signupSchema.parse(rawFormData);
    await apiClient("/api/auth/register", {
      method: "POST",
      body: validatedFields,
    });
    redirect("/");
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

// 投稿の取得
export async function fetchLatestPosts(): Promise<PostType[]> {
  try {
    const data = await apiClient<{ latestPosts: PostType[] }>(
      "/api/posts/post"
    );
    return data.latestPosts;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 新規投稿の作成
export async function createPost(content: string): Promise<PostType | null> {
  try {
    const data = await apiClient<{ user: PostType }>("/api/posts/post", {
      method: "POST",
      body: { content },
    });
    return data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

"use server";

import { z } from "zod";

const schema = z.object({
  content: z.string().min(1, "内容を入力してください"),
});

export async function handlePost(formData: FormData) {
  const rawFormData = {
    content: formData.get("content"),
  };

  try {
    const validatedFields = schema.parse(rawFormData);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/post`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: validatedFields.content,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Post failed");
    }
  } catch (error: any) {
    console.log(error);
  }
}

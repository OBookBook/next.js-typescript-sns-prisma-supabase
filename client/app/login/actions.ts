"use server";

import { z } from "zod";

const schema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上必要です"),
});

export async function loginAction(formData: FormData) {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const validatedFields = schema.parse(rawFormData);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: validatedFields.email,
          password: validatedFields.password,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    const { token } = await response.json();
    return { success: true, token };
  } catch (error: any) {
    console.log(error);
    return { success: false, error: error.message };
  }
}

"use client";

export interface JNumberUser {
  id: string;
  j_number: string;
  full_name: string | null;
  role: string;
}

export async function checkJNumberAuth(): Promise<JNumberUser | null> {
  try {
    const response = await fetch("/api/auth/jnumber/me", {
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user || null;
  } catch {
    return null;
  }
}

export async function signOutJNumber(): Promise<void> {
  try {
    await fetch("/api/auth/jnumber/sign-out", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Sign out error:", error);
  }
}


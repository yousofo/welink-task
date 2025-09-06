import { useRouter } from "next/navigation";

export async function fetcher<T>(url: string, options?: RequestInit & { auth?: boolean }): Promise<T> {
  // const headers: Record<string, string> = {
  //   "Content-Type": "application/json",
  //   ...(options?.headers as Record<string, string>),
  // };

  if (options?.auth) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      // headers["Authorization"] = `Bearer ${token}`;
      Object.assign(options, { headers: { Authorization: `Bearer ${token}` } });
    }
  }

  try {
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      ...options,
      headers: { ...options?.headers, "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

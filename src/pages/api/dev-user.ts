// pages/api/dev-user.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ error: "Not allowed in production" });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).end();
    }

    const user = await response.json();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch user" });
  }
}

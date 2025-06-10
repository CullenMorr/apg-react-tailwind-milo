// pages/api/interest-groups.ts
export default async function handler(req, res) {
  const token = process.env.TOKEN;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${backendUrl}/api/milo/interest-groups`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  res.status(response.status).json(data);
}

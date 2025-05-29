// pages/api/campaigns/[id].ts
export default async function handler(req, res) {
  const {
    query: {id},
  } = req;

  const token = process.env.TOKEN;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${backendUrl}/api/milo/email-campaigns/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  res.status(response.status).json(data);
}

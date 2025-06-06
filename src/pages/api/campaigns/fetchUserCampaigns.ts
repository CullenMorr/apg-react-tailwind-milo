// pages/api/campaigns/fetchUserCampaigns.ts
export default async function handler(req, res) {
  const token = process.env.TOKEN;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const url = new URL(`${backendUrl}/api/milo/email-campaigns`);

  // Forward query params like page, filter[name], filter[sent_from_user_id], etc.
  Object.entries(req.query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => url.searchParams.append(key, v));
    } else {
      url.searchParams.append(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  res.status(response.status).json(data);
}

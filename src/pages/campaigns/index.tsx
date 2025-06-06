import Head from "next/head";
import { Campaign } from "@/types/campaign";
import { useEffect, useState } from "react";

// Components
import CampaignCard from "@/components/ui/campaign/Card";
import CampaignPreviewCard from "@/components/ui/campaign/PreviewCard";
import CampaignPreviewCardSkeleton from "@/components/ui/campaign/PreviewCardSkeleton";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [recentCampaigns, setRecentCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/campaigns");
        if (!res.ok) throw new Error(`Failed with status ${res.status}`);
        const json = await res.json();
        const allCampaigns = json.data;

        setCampaigns(allCampaigns);

        const recentIds = allCampaigns
          .sort((a, b) => b.id - a.id)
          .slice(0, 2)
          .map((c) => c.id);

        const recentResults = await Promise.all(
          recentIds.map((id) =>
            fetch(`/api/campaigns/${id}`).then((res) => res.json())
          )
        );

        setRecentCampaigns(recentResults);
      } catch (err: any) {
        console.error("Error loading campaigns:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Campaigns | MILO</title>
      </Head>

      <section className="mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Campaigns</h1>

        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {loading
            ? [1, 2].map((i) => <CampaignPreviewCardSkeleton key={i} />)
            : recentCampaigns.map((campaign) => (
                <CampaignPreviewCard key={campaign.id} campaign={campaign} />
              ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </section>
    </>
  );
}

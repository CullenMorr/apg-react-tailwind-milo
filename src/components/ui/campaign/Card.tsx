import { Campaign } from "@/types/campaign";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{campaign.name}</h3>
        {campaign.status && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-md ${
              campaign.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {campaign.status.toUpperCase()}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-2">
        Sent on {new Date(campaign.send_at).toLocaleDateString()}
      </p>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>Sent: {campaign.emails_sent}</div>
        <div>Opens: {campaign.emails_opened}</div>
        <div>Clicks: {campaign.emails_clicked}</div>
        <div>Bounces: {campaign.emails_bounced}</div>
      </div>
    </div>
  );
}

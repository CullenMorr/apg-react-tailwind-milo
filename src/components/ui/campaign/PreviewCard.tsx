import { Campaign } from "@/types/campaign";

export default function CampaignPreviewCard({
  campaign,
}: {
  campaign: Campaign;
}) {
  const getOpenRate = (campaign: Campaign) => {
    if (!campaign || !campaign.email_events) return 0;

    const totalSent = campaign.emails_sent;
    const emailEvents = campaign.email_events;

    if (totalSent === 0) return 0;

    const uniqueEmails = new Set(
      emailEvents
        .filter((event) => event.email_event_type_id === 2)
        .map((event) => event.user?.email)
    );

    return Math.round((uniqueEmails.size / totalSent) * 100);
  };

  return (
    <div className="bg-white border-2 border-indigo-500 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Title + Status */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{campaign.name}</h2>
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

      {/* Subject, Sender, etc. */}
      <div className="text-sm text-gray-700 space-y-1 mb-6">
        {campaign.email_template?.subject_line_for_front_end && (
          <p>
            <span className="font-medium">Subject:</span>{" "}
            {campaign.email_template.subject_line_for_front_end}
          </p>
        )}
        {campaign.sent_from_user?.name && (
          <p>
            <span className="font-medium">Sender:</span>{" "}
            {campaign.sent_from_user.name}
          </p>
        )}
        {campaign.sent_by_user?.name && (
          <p>
            <span className="font-medium">Author:</span>{" "}
            {campaign.sent_by_user.name}
          </p>
        )}
        {campaign.email_template?.name && (
          <p>
            <span className="font-medium">Template:</span>{" "}
            {campaign.email_template.name}
          </p>
        )}
      </div>

      {/* Tri-column stats */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
        <div className="bg-blue-50 rounded p-2 group">
          <div className="text-blue-600">Sent</div>
          <div className="font-semibold text-blue-700">
            {campaign.emails_sent}
          </div>
        </div>

        <div className="bg-green-50 rounded p-2 group">
          <div className="text-green-600">Opens</div>
          <div className="font-semibold text-green-700"></div>

          <div className="text-green-600 group-hover:hidden">
            {getOpenRate(campaign)}%
          </div>
          <div className="text-green-600 hidden group-hover:block">
            {campaign.emails_opened}
          </div>
        </div>

        <div className="bg-purple-50 rounded p-2 group">
          <div className="text-purple-600">Clicks</div>
          <div className="text-purple-600 ">{campaign.emails_clicked}</div>
        </div>
      </div>

      {/* Sent date */}
      <p className="text-xs text-gray-400">
        Sent on {new Date(campaign.send_at).toLocaleString()}
      </p>
    </div>
  );
}

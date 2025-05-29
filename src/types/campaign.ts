export type Campaign = {
  id: number;
  name: string;
  email_template_id: number;
  sent_from_user_id: number;
  sent_by_user_id: number;
  emails_sent: number;
  emails_opened: number;
  emails_clicked: number;
  emails_bounced: number;
  send_at: string;
  it_approved: boolean;
  status: string;
  started_at: string;
  finished_at: string;
  created_at: string;
  updated_at: string;

  email_template: {
    id: number;
    name: string;
    subject_line: string;
    subject_line_for_front_end: string;
  };

  sent_from_user: {
    id: number;
    name: string;
    email: string;
  };

  sent_by_user: {
    id: number;
    name: string;
    email: string;
  };

  interest_groups: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    pivot: {
      email_campaign_id: number;
      interest_group_id: number;
      id: number;
      created_at: string;
      updated_at: string;
    };
  }[];
};

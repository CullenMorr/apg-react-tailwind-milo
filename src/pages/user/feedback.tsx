// pages/user/feedback.tsx
import Head from "next/head";
import {useEffect, useState} from "react";
import {useUser} from "@/context/UserContext";

// Types
type Feedback = {
  id: number;
  email: string;
  presentation_content_id: number | null;
  presentation_id: number | null;
  apg_employee: {
    first_name: string;
    last_name: string;
    id: number;
  } | null;
  overall_rating: number;
  standard_of_presenter: number;
  visual_quality_rating: number;
  audio_quality_rating: number;
  quality_of_question_answer: number;
  comments: string;
  created_at: string;
};

export default function UserFeedbackPage() {
  const {user} = useUser();
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.apg_employee_id) return;

    const fetchFeedback = async () => {
      try {
        const res = await fetch(`/api/cpds/fetchFeedback`);
        if (!res.ok) throw new Error(`Failed with status ${res.status}`);

        const json = await res.json();

        console.log("User employee ID:", user.apg_employee_id);
        console.log("Full feedback:", json.data);

        // Filter feedback based on employee ID
        const filtered =
          json.data?.filter(
            (f: Feedback) => f.apg_employee?.id === user.apg_employee_id
          ) || [];

        setFeedbackList(filtered);
      } catch (err: any) {
        console.error("Error loading feedback:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [user?.apg_employee_id]);

  return (
    <>
      <Head>
        <title>My CPD Feedback | MILO</title>
      </Head>

      <section className="mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          My CPD Feedback
        </h1>

        {error && <p className="text-red-500">Error: {error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : feedbackList.length === 0 ? (
          <p>No feedback found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-primary-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">ID</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Presenter</th>
                  <th className="px-4 py-3 text-center font-medium">Overall</th>
                  <th className="px-4 py-3 text-center font-medium">
                    Presenter
                  </th>
                  <th className="px-4 py-3 text-center font-medium">Visual</th>
                  <th className="px-4 py-3 text-center font-medium">Audio</th>
                  <th className="px-4 py-3 text-center font-medium">Q&A</th>
                  <th className="px-4 py-3 text-left font-medium">Comments</th>
                  <th className="px-4 py-3 text-right font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {feedbackList.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      {f.presentation_content_id
                        ? `CPD: ${f.presentation_content_id}`
                        : f.presentation_id}
                    </td>
                    <td className="px-4 py-2">{f.email}</td>
                    <td className="px-4 py-2">
                      {f.apg_employee
                        ? `${f.apg_employee.first_name} ${f.apg_employee.last_name}`
                        : ""}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {f.overall_rating}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {f.standard_of_presenter}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {f.visual_quality_rating}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {f.audio_quality_rating}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {f.quality_of_question_answer}
                    </td>
                    <td className="px-4 py-2">{f.comments}</td>
                    <td className="px-4 py-2 text-right">
                      {new Date(f.created_at).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

import Head from "next/head";
import {useEffect, useState} from "react";
import Link from "next/link";

// Types
type InterestGroup = {
  id: number;
  name: string;
  users_count: number;
  created_at: string;
};

export default function InterestGroupsPage() {
  const [interestGroups, setInterestGroups] = useState<InterestGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInterestGroups = async () => {
      try {
        const res = await fetch("/api/interest-groups");

        if (!res.ok) throw new Error(`Failed with status ${res.status}`);
        const json = await res.json();

        setInterestGroups((json || []).slice().reverse());
      } catch (err: any) {
        console.error("Error fetching interest groups:", err);
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchInterestGroups();
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB");

  return (
    <>
      <Head>
        <title>Interest Groups | MILO</title>
      </Head>

      <section className="mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Interest Groups
        </h1>

        {/* <div className="text-right mb-6">
          <Link href="/interest-groups/add">
            <button className="inline-flex items-center px-4 py-2 bg-primary-800 text-white text-sm font-medium rounded hover:bg-primary-700 transition">
              Add Interest Group
            </button>
          </Link>
        </div> */}

        {error && <p className="text-red-500 mb-4">Failed to load: {error}</p>}

        {loading && !interestGroups.length ? (
          <div className="space-y-4">
            {Array.from({length: 10}).map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-primary-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-center font-medium">ID</th>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-center font-medium">Users</th>
                  <th className="px-4 py-3 text-right font-medium">
                    Created At
                  </th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {interestGroups.length ? (
                  interestGroups.map((group) => (
                    <tr key={group.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-center">{group.id}</td>
                      <td className="px-4 py-2">{group.name}</td>
                      <td className="px-4 py-2 text-center">
                        {group.users_count}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {formatDate(group.created_at)}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Link href={`/interest-groups/edit/${group.id}`}>
                          <button className="h-8 px-3 text-sm bg-gray-100 rounded hover:bg-gray-200 transition">
                            Edit
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-6">
                      No interest groups found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

import Head from "next/head";
import { useEffect, useState } from "react";
import TemplateCard from "@/components/ui/template/Card";

type Template = {
  id: number;
  name: string;
  subject_line_for_front_end?: string;
  created_at?: string;
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/templates");
        if (!res.ok) throw new Error(`Failed with status ${res.status}`);
        const json = await res.json();
        console.log("Templates API response:", json);
        setTemplates(Array.isArray(json) ? json : []);
      } catch (err: any) {
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
        <title>Templates | MILO</title>
      </Head>

      <section className="mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Templates</h1>

        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>
    </>
  );
}

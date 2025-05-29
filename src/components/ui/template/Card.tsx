import {Template} from "@/types/template";

export default function TemplateCard({template}: {template: Template}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {template.name}
      </h2>

      <div className="text-sm text-gray-700 space-y-1 mb-4">
        {template.subject_line_for_front_end && (
          <p>
            <span className="font-medium">Subject:</span>{" "}
            {template.subject_line_for_front_end}
          </p>
        )}
        {template.email_format?.name && (
          <p>
            <span className="font-medium">Format:</span>{" "}
            {template.email_format.name}
          </p>
        )}
        {template.email_type?.name && (
          <p>
            <span className="font-medium">Type:</span>{" "}
            {template.email_type.name}
          </p>
        )}
        {template.user?.name && (
          <p>
            <span className="font-medium">Sender:</span> {template.user.name}
          </p>
        )}
        {template.author_user?.name && (
          <p>
            <span className="font-medium">Author:</span>{" "}
            {template.author_user.name}
          </p>
        )}
      </div>

      {template.created_at && (
        <p className="text-xs text-gray-400 mt-2">
          Created on {new Date(template.created_at).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

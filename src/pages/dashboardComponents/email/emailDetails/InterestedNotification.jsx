import { ThumbsUp } from "lucide-react";

export const InterestedNotification = ({ show }) => {
  if (!show) return null;

  return (
    <div className="mt-8 rounded-md border border-green-200 bg-green-50 p-4">
      <div className="flex items-center">
        <ThumbsUp className="mr-2 h-5 w-5 text-green-500" />
        <p className="font-medium text-green-800">This email has been categorized as "Interested"</p>
      </div>
      <p className="mt-1 text-sm text-green-700">A notification has been sent to your Slack channel.</p>
    </div>
  );
};
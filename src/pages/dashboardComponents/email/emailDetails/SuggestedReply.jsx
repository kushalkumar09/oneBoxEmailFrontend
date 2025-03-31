"use client";

import { Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const SuggestedReply = ({ reply }) => {
  const [showSuggestion, setShowSuggestion] = useState(false);

  if (!reply) return null;

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center font-medium text-slate-900">
          <Sparkles className="mr-2 h-5 w-5 text-amber-500" />
          AI-Suggested Reply
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setShowSuggestion(!showSuggestion)}>
          {showSuggestion ? "Hide" : "Show"} suggestion
        </Button>
      </div>

      {showSuggestion && (
        <div className="rounded-md border border-blue-100 bg-blue-50 p-4">
          <p className="text-slate-700">{reply}</p>
          <div className="mt-4 flex items-center gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="mr-2 h-4 w-4" />
              Use This Reply
            </Button>
            <Button variant="outline" size="sm">
              Edit Reply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

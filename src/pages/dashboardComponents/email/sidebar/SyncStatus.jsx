"use client";

import { RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const SyncStatus = ({ status }) => {
  return (
    <div className="mt-4 text-xs text-slate-500">
      {status.syncing ? (
        <div>
          <div className="mb-1 flex items-center">
            <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
            Syncing emails...
          </div>
          <Progress value={status.progress} className="h-1" />
        </div>
      ) : (
        <div className="flex items-center">
          <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
          All accounts synced
        </div>
      )}
    </div>
  );
};

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "../utils/helper.js";

export const UserProfile = ({ user }) => {
  return (
    <div className="flex items-center gap-3 border-b border-slate-200 p-4">
      <Avatar>
        <AvatarImage src={user?.avatar} alt={user?.name} />
        <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium text-slate-900">{user?.name}</span>
        <span className="text-xs text-slate-500">{user?.email}</span>
      </div>
    </div>
  );
};

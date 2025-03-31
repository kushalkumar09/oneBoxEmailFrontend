"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, getInitials } from "../utils/helper.js";
import CategoryBadge from "../../CategoryBadge.jsx";

export const EmailItem = ({ email, isSelected, onSelect }) => {
  return (
    <button
      className={`cursor-pointer flex w-full flex-col p-4 text-left hover:bg-slate-50 
        ${isSelected ? "bg-blue-50" : ""}
        ${!email.read ? "bg-slate-50" : ""}`}
      onClick={() => onSelect(email)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <Avatar className="mr-3 h-8 w-8">
            <AvatarFallback className="text-xs">
              {getInitials(email.senderName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className={`text-sm ${!email.read ? "font-semibold" : ""}`}>
              {email.senderName}
            </h3>
            <p className="text-xs text-slate-500">{email.sender}</p>
          </div>
        </div>
        <span className="text-xs text-slate-500">{formatDate(email.date)}</span>
      </div>

      <div className="mt-2">
        <h4 className={`text-sm ${!email.read ? "font-semibold" : ""}`}>
          {email.subject}
        </h4>
        <p className="mt-1 text-xs text-slate-500 line-clamp-2">{email.preview}</p>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <CategoryBadge category={email.category} />
        {!email.read && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
      </div>
    </button>
  );
};

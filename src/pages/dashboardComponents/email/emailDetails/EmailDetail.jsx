"use client";

import {
  ChevronDown,
  MoreHorizontal,
  Star,
  Archive,
  Trash,
  MessageSquare,
  Mail,
  Clock,
  Forward,
  Printer,
  Tag,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InterestedNotification } from "./InterestedNotification";
import CategoryBadge from "../../CategoryBadge.jsx";
import { getInitials } from "../utils/helper.js";
import { SuggestedReply } from "./SuggestedReply.jsx";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const EmailDetail = ({
  email,
  user,
  showSuggestedReply,
  onToggleSuggestedReply,
  onBack,
}) => {
 
  if (!email) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-lg">
        <div className="bg-white p-6 rounded-full shadow-sm mb-6">
          <Mail className="h-16 w-16 text-slate-300" />
        </div>
        <h3 className="text-xl font-medium text-slate-900">
          Select an email to view
        </h3>
        <p className="mt-2 text-slate-500">
          Choose an email from the list to view its contents
        </p>
      </div>
    );
  }

  const formattedDate = new Date(email.date).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const safeBody = DOMPurify.sanitize(email?.body);

  return (
    <div className="flex h-full flex-col bg-white rounded-lg shadow-sm border border-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-4 bg-slate-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={onBack}
          >
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </Button>
          <h2 className="text-lg font-semibold text-slate-900 line-clamp-1">
            {email.subject}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <CategoryBadge category={email.category || "Inbox"} />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <Printer className="h-4 w-4 text-slate-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Print</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <MoreHorizontal className="h-4 w-4 text-slate-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Star className="mr-2 h-4 w-4 text-amber-500" />
                <span>Mark as Important</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Tag className="mr-2 h-4 w-4 text-blue-500" />
                <span>Apply Label</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Clock className="mr-2 h-4 w-4 text-purple-500" />
                <span>Snooze</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Archive className="mr-2 h-4 w-4 text-green-500" />
                <span>Archive</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 p-0 overflow-y-scroll custom-scrollbar flex flex-col justify-between h-full">
        <div className="p-6">
          {/* Sender Info */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-start gap-3 min-w-full">
              <Avatar className="h-12 w-12 border border-gray-200 shadow-sm rounded-full">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  {getInitials(email.senderName || email.sender)}
                </AvatarFallback>
                {email.senderAvatar && <AvatarImage src={email.senderAvatar} />}
              </Avatar>

              <div className="flex flex-col w-full gap-2">
                {/* Sender Name & Important Badge */}
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    {email.senderName || email.sender}
                  </h3>
                  {email.important && (
                    <Badge className="bg-amber-100 text-amber-600 border-transparent px-2 py-1 rounded-md text-xs">
                      Important
                    </Badge>
                  )}
                </div>

                {/* Sender Information */}
                <p className="text-sm text-gray-700 self-start ">
                  <span className="font-semibold text-gray-900">From:</span>{" "}
                  {email.sender}
                </p>

                {/* Recipient & Date */}
                <div className="flex items-center justify-between text-xs text-gray-600 rounded-md">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-900">To:</span>{" "}
                    {email.to}
                  </p>
                  <p>{formattedDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="prose prose-slate max-w-none rounded-lg bg-slate-50 p-6 shadow-sm border border-slate-100">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: safeBody }}
            />
          </div>

          {/* Notifications */}
          {email.category === "Interested" && (
            <div className="mt-6">
              <InterestedNotification show={true} />
            </div>
          )}
        </div>

        {/* Suggested Reply at the Bottom */}
        <div className="p-4 border-t border-slate-200">
          <SuggestedReply
            reply={email.suggestedReply || "No suggested reply available"}
            showSuggestion={showSuggestedReply}
            onToggleSuggestion={onToggleSuggestedReply}
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-slate-100 p-4 bg-slate-50 rounded-b-lg">
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm transition-all duration-200 hover:shadow">
            <MessageSquare className="mr-2 h-4 w-4" />
            Reply
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Forward className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Forward</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Flag className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Flag</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

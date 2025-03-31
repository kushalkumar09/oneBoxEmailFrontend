"use client"

import { Mail } from "lucide-react"
import { EmailItem } from "./EmailItem"
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export const EmailList = ({ emails, selectedEmail, selectedFolder, selectedCategory, onSelectEmail }) => {
  return (
    <div
      className={`flex w-96 flex-col border-r border-slate-200 bg-white ${selectedEmail ? "hidden md:flex" : "flex"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-4">
        <h2 className="text-lg font-semibold">
          {selectedFolder}
          {selectedCategory && ` - ${selectedCategory}`}
        </h2>
        <span className="text-sm text-slate-500">{emails.length} emails</span>
      </div>

      {/* Scrollable Email List */}
      <div className="flex-1 hover:overflow-y-auto custom-scrollbar">
          <div className="divide-y divide-slate-100">
            {emails.length > 0 ? (
              emails.map((email) => (
                <EmailItem
                  key={email.id}
                  email={email}
                  isSelected={selectedEmail?.id === email.id}
                  onSelect={onSelectEmail}
                />
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <Mail className="mb-4 h-12 w-12 text-slate-300" />
                <h3 className="text-lg font-medium text-slate-900">No emails found</h3>
                <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
      </div>
    </div>
  )
}

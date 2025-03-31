import {Send, Archive, Trash, InboxIcon } from "lucide-react";

export const mockAccounts = [
  { id: 1, email: "work@example.com", provider: "Gmail", color: "#DB4437" },
  { id: 2, email: "personal@example.com", provider: "Outlook", color: "#0078D4" },
];

export const mockFolders = [
  { id: 1, name: "Inbox", icon: <InboxIcon className="h-4 w-4" /> },
  { id: 2, name: "Sent", icon: <Send className="h-4 w-4" /> },
  { id: 3, name: "Archive", icon: <Archive className="h-4 w-4" /> },
  { id: 4, name: "Trash", icon: <Trash className="h-4 w-4" /> },
];

export const mockCategories = [
  { id: 1, name: "Interested", color: "bg-green-500", count: 12 },
  { id: 2, name: "Meeting Booked", color: "bg-blue-500", count: 5 },
  { id: 3, name: "Not Interested", color: "bg-yellow-500", count: 8 },
  { id: 4, name: "Spam", color: "bg-red-500", count: 23 },
  { id: 5, name: "Out of Office", color: "bg-purple-500", count: 3 },
];

export const mockEmails = [
  {
    messageId: "msg1",
    subject: "Meeting Reminder",
    sender: "john.doe@example.com",
    to: "jane.smith@example.com",
    senderName: "John Doe",
    preview: "Hey Jane, just a reminder about our meeting...",
    date: new Date("2025-03-30T10:00:00Z"),
    read: false,
    category: "Meeting Booked",
    account: "66101f8a3d2f1c0012345678", // Example ObjectId
    folder: "Inbox",
    body: "Hey Jane, just a reminder about our meeting tomorrow at 10 AM. Let me know if you have any questions!",
  },
  {
    messageId: "msg2",
    subject: "Job Opportunity at TechCorp",
    sender: "recruiter@techcorp.com",
    to: "jane.smith@example.com",
    senderName: "TechCorp Recruiter",
    preview: "We came across your profile and wanted to discuss...",
    date: new Date("2025-03-29T14:30:00Z"),
    read: true,
    category: "Interested",
    account: "66101f8a3d2f1c0012345678",
    folder: "Inbox",
    body: "We came across your profile and wanted to discuss a job opportunity with you at TechCorp. Let us know if you're interested!",
  },
  {
    messageId: "msg3",
    subject: "Special Offer Just for You!",
    sender: "promo@shopnow.com",
    to: "jane.smith@example.com",
    senderName: "ShopNow Promotions",
    preview: "Enjoy a 50% discount on your next purchase...",
    date: new Date("2025-03-28T08:15:00Z"),
    read: false,
    category: "Spam",
    account: "66101f8a3d2f1c0012345678",
    folder: "Spam",
    body: "Enjoy a 50% discount on your next purchase. Hurry, the offer expires soon!",
  },
  {
    messageId: "msg4",
    subject: "Out of Office Reply",
    sender: "manager@company.com",
    to: "jane.smith@example.com",
    senderName: "Manager",
    preview: "I am currently out of the office...",
    date: new Date("2025-03-27T12:00:00Z"),
    read: true,
    category: "Out of Office",
    account: "66101f8a3d2f1c0012345678",
    folder: "Inbox",
    body: "I am currently out of the office and will return on April 1st. For urgent matters, please contact my assistant.",
  },
  {
    messageId: "msg5",
    subject: "Project Update",
    sender: "teamlead@company.com",
    to: "jane.smith@example.com",
    senderName: "Team Lead",
    preview: "Here's the latest update on our project...",
    date: new Date("2025-03-26T09:45:00Z"),
    read: true,
    category: "Inbox",
    account: "66101f8a3d2f1c0012345678",
    folder: "Inbox",
    body: "Here's the latest update on our project. We have completed the first phase and are moving to the next stage.",
  },
];
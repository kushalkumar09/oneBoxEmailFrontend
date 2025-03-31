import { useState, useEffect } from "react"
import {
  Search,
  Mail,
  Inbox,
  Send,
  Archive,
  Trash,
  Settings,
  AlertCircle,
  Bell,
  ExternalLink,
  Filter,
  RefreshCw,
  ThumbsUp,
  Calendar,
  X,
  MessageSquare,
  Sparkles,
  PlusCircle,
  ChevronDown,
  MoreHorizontal,
  Star,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

// Mock data for demonstration
const mockAccounts = [
  { id: 1, email: "work@example.com", provider: "Gmail", color: "#DB4437" },
  { id: 2, email: "personal@example.com", provider: "Outlook", color: "#0078D4" },
]

const mockFolders = [
  { id: 1, name: "Inbox", icon: <Inbox className="h-4 w-4" /> },
  { id: 2, name: "Sent", icon: <Send className="h-4 w-4" /> },
  { id: 3, name: "Archive", icon: <Archive className="h-4 w-4" /> },
  { id: 4, name: "Trash", icon: <Trash className="h-4 w-4" /> },
]

const mockCategories = [
  { id: 1, name: "Interested", color: "bg-green-500", count: 12 },
  { id: 2, name: "Meeting Booked", color: "bg-blue-500", count: 5 },
  { id: 3, name: "Not Interested", color: "bg-yellow-500", count: 8 },
  { id: 4, name: "Spam", color: "bg-red-500", count: 23 },
  { id: 5, name: "Out of Office", color: "bg-purple-500", count: 3 },
]

const mockEmails = [
  {
    id: 1,
    subject: "Your application has been received",
    sender: "recruiting@techcompany.com",
    senderName: "Tech Company Recruiting",
    preview: "Thank you for your interest in our Software Engineer position...",
    date: "2025-03-19T14:30:00",
    read: true,
    category: "Interested",
    account: 1,
    folder: "Inbox",
    body: `
      <p>Hello,</p>
      <p>Thank you for your interest in our Software Engineer position. Your resume has been shortlisted for the next round. When would be a good time for you to attend the technical interview?</p>
      <p>Best regards,<br>Recruiting Team</p>
    `,
    suggestedReply:
      "Thank you for shortlisting my profile! I'm available for a technical interview. You can book a slot here: https://cal.com/example",
  },
  {
    id: 2,
    subject: "Follow-up on your recent inquiry",
    sender: "sales@productcompany.com",
    senderName: "Product Sales",
    preview: "We wanted to follow up on your recent inquiry about our enterprise plan...",
    date: "2025-03-18T09:15:00",
    read: false,
    category: "Meeting Booked",
    account: 1,
    folder: "Inbox",
    body: `
      <p>Hi there,</p>
      <p>We wanted to follow up on your recent inquiry about our enterprise plan. I've scheduled a demo for next Tuesday at 2 PM as requested.</p>
      <p>Looking forward to our meeting!</p>
      <p>Regards,<br>Sales Team</p>
    `,
    suggestedReply:
      "Thank you for confirming the demo. I've added it to my calendar and look forward to our meeting on Tuesday at 2 PM.",
  },
  {
    id: 3,
    subject: "Not interested in your services at this time",
    sender: "contact@company.com",
    senderName: "Company Contact",
    preview: "Thank you for reaching out, but we are not interested in your services at this time...",
    date: "2025-03-17T16:45:00",
    read: true,
    category: "Not Interested",
    account: 2,
    folder: "Inbox",
    body: `
      <p>Hello,</p>
      <p>Thank you for reaching out, but we are not interested in your services at this time. We'll keep your information on file for future reference.</p>
      <p>Regards,<br>Company Name</p>
    `,
    suggestedReply:
      "Thank you for your response. I understand you're not interested at this time. Please feel free to reach out if your needs change in the future.",
  },
  {
    id: 4,
    subject: "URGENT: You've won a prize!!!",
    sender: "prize@suspicious.com",
    senderName: "Prize Department",
    preview: "Congratulations! You've been selected as the winner of our monthly lottery...",
    date: "2025-03-16T11:20:00",
    read: false,
    category: "Spam",
    account: 2,
    folder: "Inbox",
    body: `
      <p>CONGRATULATIONS!!!</p>
      <p>You've been selected as the winner of our monthly lottery! Click here to claim your prize now!</p>
      <p>Don't delay - offer expires soon!</p>
    `,
    suggestedReply: "",
  },
  {
    id: 5,
    subject: "Out of Office: March 15-22",
    sender: "john.doe@business.com",
    senderName: "John Doe",
    preview: "I will be out of the office from March 15-22 with limited email access...",
    date: "2025-03-15T08:30:00",
    read: true,
    category: "Out of Office",
    account: 1,
    folder: "Inbox",
    body: `
      <p>Hello,</p>
      <p>I will be out of the office from March 15-22 with limited email access. For urgent matters, please contact my colleague Jane Smith at jane.smith@business.com.</p>
      <p>Regards,<br>John Doe</p>
    `,
    suggestedReply:
      "Thank you for letting me know you're out of office. I'll reach out to Jane for any urgent matters.",
  },
  {
    id: 6,
    subject: "Interview Invitation - Software Developer Position",
    sender: "hr@techinnovators.com",
    senderName: "HR Department",
    preview: "We're pleased to invite you to interview for the Software Developer position...",
    date: "2025-03-14T13:45:00",
    read: false,
    category: "Interested",
    account: 1,
    folder: "Inbox",
    body: `
      <p>Dear Candidate,</p>
      <p>We're pleased to invite you to interview for the Software Developer position at Tech Innovators. Your experience aligns well with what we're looking for.</p>
      <p>Please let us know your availability for next week.</p>
      <p>Best regards,<br>HR Department</p>
    `,
    suggestedReply:
      "Thank you for the interview invitation! I'm excited about the opportunity to join Tech Innovators. You can book a time that works for you here: https://cal.com/example",
  },
]

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()

  if (isToday) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  } else {
    return date.toLocaleDateString([], { month: "short", day: "numeric" })
  }
}

// Get initials from name
const getInitials = (name) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

// Category badge component
const CategoryBadge = ({ category }) => {
  const getColor = (category) => {
    switch (category) {
      case "Interested":
        return "bg-green-100 text-green-800 border-green-200"
      case "Meeting Booked":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Not Interested":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Spam":
        return "bg-red-100 text-red-800 border-red-200"
      case "Out of Office":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getIcon = (category) => {
    switch (category) {
      case "Interested":
        return <ThumbsUp className="mr-1 h-3 w-3" />
      case "Meeting Booked":
        return <Calendar className="mr-1 h-3 w-3" />
      case "Not Interested":
        return <X className="mr-1 h-3 w-3" />
      case "Spam":
        return <AlertCircle className="mr-1 h-3 w-3" />
      case "Out of Office":
        return <Clock className="mr-1 h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <Badge variant="outline" className={`flex items-center ${getColor(category)}`}>
      {getIcon(category)}
      {category}
    </Badge>
  )
}

export default function Dashboard({user}) {
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [selectedFolder, setSelectedFolder] = useState("Inbox")
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [filteredEmails, setFilteredEmails] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [syncStatus, setSyncStatus] = useState({ syncing: false, progress: 0 })
  const [showSuggestedReply, setShowSuggestedReply] = useState(false)

  // Initialize with all emails
  useEffect(() => {
    filterEmails()
  }, [selectedAccount, selectedFolder, selectedCategory, searchQuery])

  // Simulate email sync
  useEffect(() => {
    const simulateSync = () => {
      setSyncStatus({ syncing: true, progress: 0 })

      const interval = setInterval(() => {
        setSyncStatus((prev) => {
          const newProgress = prev.progress + 10
          if (newProgress >= 100) {
            clearInterval(interval)
            return { syncing: false, progress: 100 }
          }
          return { syncing: true, progress: newProgress }
        })
      }, 300)

      return () => clearInterval(interval)
    }

    simulateSync()

    // Simulate periodic sync
    const syncInterval = setInterval(simulateSync, 30000)
    return () => clearInterval(syncInterval)
  }, [])

  const filterEmails = () => {
    let filtered = [...mockEmails]

    if (selectedAccount) {
      filtered = filtered.filter((email) => email.account === selectedAccount)
    }

    if (selectedFolder) {
      filtered = filtered.filter((email) => email.folder === selectedFolder)
    }

    if (selectedCategory) {
      filtered = filtered.filter((email) => email.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (email) =>
          email.subject.toLowerCase().includes(query) ||
          email.sender.toLowerCase().includes(query) ||
          email.preview.toLowerCase().includes(query),
      )
    }

    setFilteredEmails(filtered)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSelectEmail = (email) => {
    setSelectedEmail(email)
    setShowSuggestedReply(false)
  }

  const handleRefresh = () => {
    setSyncStatus({ syncing: true, progress: 0 })

    const interval = setInterval(() => {
      setSyncStatus((prev) => {
        const newProgress = prev.progress + 20
        if (newProgress >= 100) {
          clearInterval(interval)
          return { syncing: false, progress: 100 }
        }
        return { syncing: true, progress: newProgress }
      })
    }, 200)
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <div className="flex w-64 flex-col border-r border-slate-200 bg-white">
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

        {/* Account selection */}
        <div className="p-4">
          <Select onValueChange={(value) => setSelectedAccount(Number(value))} defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Accounts" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all" className="bg-white">All Account</SelectItem>
              {mockAccounts.map((account) => (
                <SelectItem key={account.id} value={account.id.toString()}>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: account.color }}></div>
                    {account.email}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="border w-full mt-1">Add New Email Account</Button>
        </div>

        {/* Folders */}
        <div className="px-3 py-2">
          <h3 className="mb-2 px-3 text-xs font-medium uppercase text-slate-500">Folders</h3>
          <nav className="space-y-1">
            {mockFolders.map((folder) => (
              <button
                key={folder.id}
                className={`flex w-full items-center rounded-md px-3 py-2 text-sm ${
                  selectedFolder === folder.name
                    ? "bg-slate-100 font-medium text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
                onClick={() => setSelectedFolder(folder.name)}
              >
                <span className="mr-2 text-slate-500">{folder.icon}</span>
                {folder.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Categories */}
        <div className="px-3 py-2">
          <h3 className="mb-2 px-3 text-xs font-medium uppercase text-slate-500">Categories</h3>
          <nav className="space-y-1">
            {mockCategories.map((category) => (
              <button
                key={category.id}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm ${
                  selectedCategory === category.name
                    ? "bg-slate-100 font-medium text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
              >
                <div className="flex items-center">
                  <div className={`mr-2 h-2 w-2 rounded-full ${category.color}`}></div>
                  {category.name}
                </div>
                <Badge variant="secondary" className="ml-auto bg-slate-100">
                  {category.count}
                </Badge>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-200 p-4">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>

          <div className="mt-4 text-xs text-slate-500">
            {syncStatus.syncing ? (
              <div>
                <div className="mb-1 flex items-center">
                  <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                  Syncing emails...
                </div>
                <Progress value={syncStatus.progress} className="h-1" />
              </div>
            ) : (
              <div className="flex items-center">
                <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                All accounts synced
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white p-4">
          <div className="relative w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
            <Input placeholder="Search emails..." className="pl-8" value={searchQuery} onChange={handleSearch} />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className={`mr-1 h-4 w-4 ${syncStatus.syncing ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            <Button variant="outline" size="sm">
              <Filter className="mr-1 h-4 w-4" />
              Filter
            </Button>

            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>

            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white" align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Manage Integrations
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Email list and detail view */}
        <div className="flex flex-1 overflow-hidden">
          {/* Email list */}
          <div
            className={`flex w-96 flex-col border-r border-slate-200 bg-white ${selectedEmail ? "hidden md:flex" : "flex"} overflow-y-scroll`}
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <h2 className="text-lg font-semibold">
                {selectedFolder}
                {selectedCategory && ` - ${selectedCategory}`}
              </h2>
              <span className="text-sm text-slate-500">{filteredEmails.length} emails</span>
            </div>

            <ScrollArea className="flex-1">
              {filteredEmails.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {filteredEmails.map((email) => (
                    <button
                      key={email.id}
                      className={`flex w-full flex-col p-4 text-left hover:bg-slate-50 ${
                        selectedEmail?.id === email.id ? "bg-blue-50" : ""
                      } ${!email.read ? "bg-slate-50" : ""}`}
                      onClick={() => handleSelectEmail(email)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <Avatar className="mr-3 h-8 w-8">
                            <AvatarFallback className="text-xs">{getInitials(email.senderName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className={`text-sm ${!email.read ? "font-semibold" : ""}`}>{email.senderName}</h3>
                            <p className="text-xs text-slate-500">{email.sender}</p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-500">{formatDate(email.date)}</span>
                      </div>

                      <div className="mt-2">
                        <h4 className={`text-sm ${!email.read ? "font-semibold" : ""}`}>{email.subject}</h4>
                        <p className="mt-1 text-xs text-slate-500 line-clamp-2">{email.preview}</p>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <CategoryBadge category={email.category} />

                        {!email.read && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                  <Mail className="mb-4 h-12 w-12 text-slate-300" />
                  <h3 className="text-lg font-medium text-slate-900">No emails found</h3>
                  <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters</p>
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Email detail view */}
          <div className={`flex-1 overflow-hidden bg-white ${!selectedEmail ? "hidden md:block" : "block"}`}>
            {selectedEmail ? (
              <div className="flex h-full flex-col overflow-y-scroll">
                <div className="flex items-center justify-between border-b border-slate-200 p-4">
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="md:hidden mr-2" onClick={() => setSelectedEmail(null)}>
                      <ChevronDown className="h-4 w-4 -rotate-90" />
                    </Button>
                    <h2 className="text-lg font-semibold">{selectedEmail.subject}</h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <CategoryBadge category={selectedEmail.category} />

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white" align="end">
                        <DropdownMenuItem>
                          <Star className="mr-2 h-4 w-4" />
                          Mark as Important
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-6">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-start">
                      <Avatar className="mr-4 h-10 w-10">
                        <AvatarFallback>{getInitials(selectedEmail.senderName)}</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium text-slate-900">{selectedEmail.senderName}</h3>
                        <p className="text-sm text-slate-500">{selectedEmail.sender}</p>
                        <p className="mt-1 text-xs text-slate-400">To: {user?.email}</p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-500">{new Date(selectedEmail.date).toLocaleString()}</p>
                  </div>

                  <div
                    className="prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
                  />

                  {selectedEmail.category === "Interested" && (
                    <div className="mt-8 rounded-md border border-green-200 bg-green-50 p-4">
                      <div className="flex items-center">
                        <ThumbsUp className="mr-2 h-5 w-5 text-green-500" />
                        <p className="font-medium text-green-800">This email has been categorized as "Interested"</p>
                      </div>
                      <p className="mt-1 text-sm text-green-700">A notification has been sent to your Slack channel.</p>
                    </div>
                  )}

                  {selectedEmail.suggestedReply && (
                    <div className="mt-8">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="flex items-center font-medium text-slate-900">
                          <Sparkles className="mr-2 h-5 w-5 text-amber-500" />
                          AI-Suggested Reply
                        </h3>
                        <Button variant="ghost" size="sm" onClick={() => setShowSuggestedReply(!showSuggestedReply)}>
                          {showSuggestedReply ? "Hide" : "Show"} suggestion
                        </Button>
                      </div>

                      {showSuggestedReply && (
                        <div className="rounded-md border border-blue-100 bg-blue-50 p-4">
                          <p className="text-slate-700">{selectedEmail.suggestedReply}</p>
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
                  )}
                </ScrollArea>

                <div className="border-t border-slate-200 p-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Reply
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <Mail className="mb-4 h-16 w-16 text-slate-200" />
                <h3 className="text-xl font-medium text-slate-900">Select an email to view</h3>
                <p className="mt-2 text-slate-500">Choose an email from the list to view its contents</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


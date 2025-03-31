import { useState, useEffect } from "react";
import { Sidebar } from "./email/sidebar/Sidebar.jsx";
import { Header } from "./email/header/Header.jsx";
import { EmailList } from "./email/emailList/EmailList.jsx";
import { EmailDetail } from "../dashboardComponents/email/emailDetails/EmailDetail.jsx";
import { mockAccounts, mockFolders, mockCategories, mockEmails } from "./email/data/mockData.jsx";
import useFetchUserEmails from "@/hooks/useFetchUserEmails.jsx";




export default function Dashboard({ user }) {
  const { emails, loading, error } = useFetchUserEmails(user?._id); 
  console.log(emails)
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState("Inbox");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [syncStatus, setSyncStatus] = useState({ syncing: false, progress: 0 });
  const [showSuggestedReply, setShowSuggestedReply] = useState(false);

  useEffect(() => {
    filterEmails();
  }, [selectedAccount, selectedFolder, selectedCategory, searchQuery,emails]);

  useEffect(() => {
    const simulateSync = () => {
      setSyncStatus({ syncing: true, progress: 0 });

      const interval = setInterval(() => {
        setSyncStatus((prev) => {
          const newProgress = prev.progress + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            return { syncing: false, progress: 100 };
          }
          return { syncing: true, progress: newProgress };
        });
      }, 300);

      return () => clearInterval(interval);
    };

    simulateSync();
    const syncInterval = setInterval(simulateSync, 30000);
    return () => clearInterval(syncInterval);
  }, []);

  const filterEmails = () => {
    if (!emails || emails.length === 0) {
      setFilteredEmails([...mockEmails]); // Set to empty if no emails are available
      return;
    }
    emails.data.sort((a, b) => new Date(b.date) - new Date(a.date));
    let filtered = [...emails?.data];

    if (selectedAccount) {
      filtered = filtered.filter((email) => email.account === selectedAccount);
    }
    if (selectedFolder) {
      filtered = filtered.filter((email) => email.folder === selectedFolder);
    }
    if (selectedCategory) {
      filtered = filtered.filter((email) => email.category === selectedCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (email) =>
          email.subject.toLowerCase().includes(query) ||
          email.sender.toLowerCase().includes(query) ||
          email.preview.toLowerCase().includes(query)
      );
    }

    setFilteredEmails(filtered);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
    setShowSuggestedReply(false);
  };

  const handleRefresh = () => {
    setSyncStatus({ syncing: true, progress: 0 });

    const interval = setInterval(() => {
      setSyncStatus((prev) => {
        const newProgress = prev.progress + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          return { syncing: false, progress: 100 };
        }
        return { syncing: true, progress: newProgress };
      });
    }, 200);
  };

  
  if(error) {
    return <div className="flex items-center justify-center h-screen">Error: {error}</div>;
  }
  if(loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }



  return (
    <div className="flex h-screen w-full overflow-y-auto custom-scrollbar bg-slate-50">
      <Sidebar
        user={user}
        accounts={mockAccounts}
        folders={mockFolders}
        categories={mockCategories}
        selectedAccount={selectedAccount}
        selectedFolder={selectedFolder}
        selectedCategory={selectedCategory}
        syncStatus={syncStatus}
        onSelectAccount={setSelectedAccount}
        onSelectFolder={setSelectedFolder}
        onSelectCategory={setSelectedCategory}
      />

      <div className="flex flex-1 flex-col">
        <Header searchQuery={searchQuery} syncStatus={syncStatus} onSearch={handleSearch} onRefresh={handleRefresh} />

        <div className="flex flex-1 overflow-hidden">
          <EmailList
            emails={filteredEmails}
            selectedEmail={selectedEmail}
            selectedFolder={selectedFolder}
            selectedCategory={selectedCategory}
            onSelectEmail={handleSelectEmail}
          />

          <div className={`flex-1 overflow-hidden bg-white ${!selectedEmail ? "hidden md:block" : "block"}`}>
            <EmailDetail
              email={selectedEmail}
              user={user}
              showSuggestedReply={showSuggestedReply}
              onToggleSuggestedReply={() => setShowSuggestedReply(!showSuggestedReply)}
              onBack={() => setSelectedEmail(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

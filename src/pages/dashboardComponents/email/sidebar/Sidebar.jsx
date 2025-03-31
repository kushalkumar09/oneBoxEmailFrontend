"use client";

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfile } from "./UserProfile";
import { AccountSelector } from "./AccountSelector";
import { FolderList } from "./FolderList";
import { CategoryList } from "./CategoryList";
import { SyncStatus } from "./SyncStatus";

export const Sidebar = ({
  user,
  accounts,
  folders,
  categories,
  selectedAccount,
  selectedFolder,
  selectedCategory,
  syncStatus,
  onSelectAccount,
  onSelectFolder,
  onSelectCategory,
}) => {
  return (
    <div className="flex w-64 flex-col border-r border-slate-200 bg-white">
      <UserProfile user={user} />
      <AccountSelector accounts={accounts} onSelectAccount={onSelectAccount} />
      <FolderList
        folders={folders}
        selectedFolder={selectedFolder}
        onSelectFolder={onSelectFolder}
      />
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      <div className="mt-auto border-t border-slate-200 p-4">
        <Button variant="outline" className="w-full justify-start" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>

        <SyncStatus status={syncStatus} />
      </div>
    </div>
  );
};

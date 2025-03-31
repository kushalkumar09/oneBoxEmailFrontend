"use client";

import { useState } from "react";
import { Search, RefreshCw, Filter, Bell, MoreHorizontal, PlusCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [syncing, setSyncing] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRefresh = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1000); // Simulate refresh
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white p-4">
      <div className="relative w-96">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
        <Input placeholder="Search emails..." className="pl-8" value={searchQuery} onChange={handleSearch} />
      </div>

      <div className="flex items-center gap-2 ">
        <Button variant="outline" size="sm" onClick={handleRefresh} className={`cursor-pointer`}>
          <RefreshCw className={`mr-1 h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
          Refresh
        </Button>

        <Button variant="outline" size="sm" className={`cursor-pointer`}>
          <Filter className="mr-1 h-4 w-4" />
          Filter
        </Button>

        <Button variant="outline" size="icon" className={`cursor-pointer`}>
          <Bell className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className={`cursor-pointer`}>
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
  );
};

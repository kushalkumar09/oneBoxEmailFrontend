"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AccountSelector = ({ accounts, onSelectAccount }) => {
  const [selectedAccount, setSelectedAccount] = useState("all");

  const handleChange = (value) => {
    setSelectedAccount(value);
    onSelectAccount(value === "all" ? null : Number(value));
  };

  return (
    <div className="p-2">
      <Select onValueChange={handleChange} value={selectedAccount}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Accounts" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">All Accounts</SelectItem>
          {accounts.map((account) => (
            <SelectItem key={account.id} value={account.id.toString()}>
              <div className="flex items-center cursor-pointer">
                <div
                  className="mr-2 h-2 w-2 rounded-full"
                  style={{ backgroundColor: account.color }}
                ></div>
                {account.email}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* x */}
    </div>
  );
};

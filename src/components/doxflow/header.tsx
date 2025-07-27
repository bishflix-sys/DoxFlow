"use client";

import * as React from "react";
import { Search, PlusCircle, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DoxflowHeaderProps = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onUploadClick: () => void;
};

export function DoxflowHeader({
  searchQuery,
  onSearchQueryChange,
  onUploadClick,
}: DoxflowHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-8">
      <div className="flex items-center gap-2">
        <FolderKanban className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">DoxFlow</h1>
      </div>
      <div className="flex w-full max-w-md items-center gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher des documents..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="w-full rounded-full pl-10"
          />
        </div>
        <Button onClick={onUploadClick} className="shrink-0 rounded-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Télécharger
        </Button>
      </div>
    </header>
  );
}

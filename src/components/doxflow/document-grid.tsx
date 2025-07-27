"use client";

import * as React from "react";
import type { Document } from "@/lib/types";
import { DocumentCard } from "./document-card";

type DocumentGridProps = {
  documents: Document[];
  onUpdateDocument: (doc: Document) => void;
  onDeleteDocument: (id: string) => void;
  searchQuery: string;
};

export function DocumentGrid({
  documents,
  onUpdateDocument,
  onDeleteDocument,
  searchQuery
}: DocumentGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onUpdate={onUpdateDocument}
          onDelete={onDeleteDocument}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}

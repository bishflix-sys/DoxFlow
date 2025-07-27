"use client";

import * as React from "react";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';
import { FileText, MoreVertical, Trash2, Edit, FileJson2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DocumentPreviewModal } from "./document-preview-modal";
import type { Document } from "@/lib/types";

type DocumentCardProps = {
  document: Document;
  onUpdate: (doc: Document) => void;
  onDelete: (id: string) => void;
  searchQuery: string;
};

export function DocumentCard({ document, onUpdate, onDelete, searchQuery }: DocumentCardProps) {
  const [isPreviewOpen, setPreviewOpen] = React.useState(false);

  return (
    <>
      <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="flex-row items-start gap-4 p-4 cursor-pointer" onClick={() => setPreviewOpen(true)}>
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 shrink-0">
             <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-base leading-tight">{document.title}</CardTitle>
            <CardDescription className="mt-1 text-xs">
              {format(document.uploadDate, "d MMMM yyyy", { locale: fr })}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4 pt-0">
            <div className="flex flex-wrap gap-1">
                {document.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
                ))}
                {document.tags.length > 3 && (
                    <Badge variant="outline">+{document.tags.length - 3}</Badge>
                )}
            </div>
        </CardContent>
        <CardFooter className="p-2 border-t">
           <Button variant="ghost" size="sm" className="w-full justify-start text-sm" onClick={() => setPreviewOpen(true)}>
            Ouvrir l'aperçu
           </Button>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8 shrink-0">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setPreviewOpen(true)}>
                    <FileJson2 className="w-4 h-4 mr-2" />
                    Aperçu et Résumé
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(document.id)} className="text-destructive focus:text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                </DropdownMenuItem>
            </DropdownMenuContent>
           </DropdownMenu>
        </CardFooter>
      </Card>
      <DocumentPreviewModal
        isOpen={isPreviewOpen}
        onOpenChange={setPreviewOpen}
        document={document}
        onUpdate={onUpdate}
        searchQuery={searchQuery}
      />
    </>
  );
}

"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Loader2, Lightbulb } from "lucide-react";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';
import { handleSummarize } from "@/app/actions";
import type { Document } from "@/lib/types";

type DocumentPreviewModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  document: Document;
  onUpdate: (doc: Document) => void;
  searchQuery: string;
};

const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-accent/50 text-accent-foreground px-1 rounded">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

export function DocumentPreviewModal({
  isOpen,
  onOpenChange,
  document,
  searchQuery,
}: DocumentPreviewModalProps) {
  const [summary, setSummary] = React.useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSummarize = async () => {
    setIsSummarizing(true);
    setError(null);
    setSummary(null);
    try {
      const result = await handleSummarize({ documentContent: document.content });
      setSummary(result.summary);
    } catch (e) {
      setError("Impossible de générer le résumé. Veuillez réessayer.");
    } finally {
      setIsSummarizing(false);
    }
  };
  
  React.useEffect(() => {
    if (isOpen) {
      setSummary(null);
      setError(null);
      setIsSummarizing(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl">{document.title}</DialogTitle>
          <DialogDescription>
            Téléchargé le {format(document.uploadDate, "d MMMM yyyy, HH:mm", { locale: fr })}
          </DialogDescription>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {document.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-6 flex-1 min-h-0">
          <div className="flex flex-col gap-4">
              <h3 className="font-semibold">Contenu du document</h3>
              <ScrollArea className="flex-1 rounded-md border p-4 bg-secondary/30">
                <p className="text-sm text-foreground/80 whitespace-pre-wrap">
                  <HighlightedText text={document.content} highlight={searchQuery} />
                </p>
              </ScrollArea>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Résumé par l'IA</h3>
              <Button onClick={onSummarize} disabled={isSummarizing} size="sm" variant="outline">
                {isSummarizing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                Générer un résumé
              </Button>
            </div>
            <div className="flex-1 p-4 border rounded-md">
                {isSummarizing && (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/6" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                )}
                {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
                {summary && (
                    <Alert>
                        <Lightbulb className="w-4 h-4"/>
                        <AlertTitle>Résumé</AlertTitle>
                        <AlertDescription className="whitespace-pre-wrap">{summary}</AlertDescription>
                    </Alert>
                )}
                {!isSummarizing && !summary && !error && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                        <Sparkles size={32} className="mb-2"/>
                        <p className="text-sm">Le résumé du document apparaîtra ici.</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles, Loader2, Plus, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleSuggestTags } from "@/app/actions";
import type { Document } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères."),
  content: z.string().min(10, "Le contenu doit contenir au moins 10 caractères."),
  tags: z.array(z.string()).min(1, "Veuillez ajouter au moins une balise."),
});

type UploadDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddDocument: (doc: Omit<Document, "id" | "uploadDate">) => void;
};

export function UploadDialog({
  isOpen,
  onOpenChange,
  onAddDocument,
}: UploadDialogProps) {
  const { toast } = useToast();
  const [tagInput, setTagInput] = React.useState("");
  const [suggestedTags, setSuggestedTags] = React.useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const documentContent = form.watch("content");

  const handleSuggest = async () => {
    setIsSuggesting(true);
    setSuggestedTags([]);
    try {
      const result = await handleSuggestTags({ documentContent });
      setSuggestedTags(result.suggestedTags);
    } catch (e) {
      toast({
        title: "Erreur",
        description: "Impossible de suggérer des balises.",
        variant: "destructive",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const addTag = (tag: string) => {
    const cleanTag = tag.trim().toLowerCase();
    if (cleanTag && !form.getValues("tags").includes(cleanTag)) {
      form.setValue("tags", [...form.getValues("tags"), cleanTag]);
    }
  };

  const handleAddTagFromInput = () => {
    addTag(tagInput);
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue(
      "tags",
      form.getValues("tags").filter((tag) => tag !== tagToRemove)
    );
  };
  
  const addSuggestedTag = (tag: string) => {
    addTag(tag);
    setSuggestedTags(prev => prev.filter(t => t !== tag));
  };


  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddDocument(values);
    form.reset();
    setSuggestedTags([]);
  }

  React.useEffect(() => {
      if (!isOpen) {
        form.reset();
        setSuggestedTags([]);
        setTagInput("");
      }
  }, [isOpen, form])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Télécharger un nouveau document</DialogTitle>
          <DialogDescription>
            Remplissez les détails ci-dessous pour ajouter un document à votre
            espace.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre du document</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Rapport Financier Q3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenu</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Collez le contenu de votre document ici..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSuggest}
                disabled={!documentContent || isSuggesting}
              >
                {isSuggesting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Suggérer des balises par l'IA
              </Button>
              {isSuggesting && <p className="text-sm text-muted-foreground mt-2">Analyse du contenu en cours...</p>}
              {suggestedTags.length > 0 && (
                <div className="mt-2 space-y-2">
                    <p className="text-sm text-muted-foreground">Suggestions :</p>
                    <div className="flex flex-wrap gap-2">
                        {suggestedTags.map((tag) => (
                            <Button type="button" size="sm" variant="outline" key={tag} onClick={() => addSuggestedTag(tag)}>
                                <Plus className="h-3 w-3 mr-1" />
                                {tag}
                            </Button>
                        ))}
                    </div>
                </div>
              )}
            </div>
            
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Balises</FormLabel>
                  <div className="flex gap-2">
                    <div className="relative flex-grow">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Ajouter une balise"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTagFromInput();
                          }
                        }}
                        className="pl-9"
                      />
                    </div>
                    <Button type="button" onClick={handleAddTagFromInput}>Ajouter</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {form.watch('tags').map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                        <button
                          type="button"
                          className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit">Enregistrer le document</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

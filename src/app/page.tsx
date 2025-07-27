"use client";

import * as React from "react";
import { PlusCircle, FileText, Search } from "lucide-react";
import { DoxflowHeader } from "@/components/doxflow/header";
import { DocumentGrid } from "@/components/doxflow/document-grid";
import { UploadDialog } from "@/components/doxflow/upload-dialog";
import type { Document } from "@/lib/types";

const initialDocuments: Document[] = [
  {
    id: "1",
    title: "Rapport Trimestriel Q1 2024",
    content: "Analyse des performances et des objectifs financiers pour le premier trimestre. Les revenus ont augmenté de 15% par rapport à l'année précédente, principalement grâce au lancement de notre nouveau produit. Les marges bénéficiaires restent stables. Les perspectives pour le T2 sont optimistes.",
    uploadDate: new Date("2024-04-15"),
    tags: ["finance", "rapport", "q1"],
  },
  {
    id: "2",
    title: "Spécifications Marketing Produit V2",
    content: "Ce document détaille les spécifications marketing pour la version 2 de notre produit phare. Il inclut les personas cibles, les messages clés, et la stratégie de lancement sur les réseaux sociaux. Le budget alloué est de 50 000€.",
    uploadDate: new Date("2024-05-02"),
    tags: ["marketing", "produit", "stratégie"],
  },
  {
    id: "3",
    title: "Compte Rendu Réunion Projet Phoenix",
    content: "Résumé de la réunion du 28 mai concernant le projet Phoenix. Points clés abordés : avancement du développement, blocages actuels, et prochaines étapes. L'équipe de développement a besoin de ressources supplémentaires pour respecter les délais.",
    uploadDate: new Date("2024-05-29"),
    tags: ["projet", "réunion", "phoenix"],
  },
  {
    id: "4",
    title: "Guide de l'employé",
    content: "Le guide complet pour tous les nouveaux employés. Il couvre la culture d'entreprise, les politiques internes, les avantages sociaux, et les informations de contact importantes. Une lecture obligatoire pour une intégration réussie.",
    uploadDate: new Date("2024-01-10"),
    tags: ["rh", "guide", "onboarding"],
  },
];

export default function Home() {
  const [documents, setDocuments] = React.useState<Document[]>(initialDocuments);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isUploadOpen, setUploadOpen] = React.useState(false);

  const handleAddDocument = (newDocument: Omit<Document, "id" | "uploadDate">) => {
    const docToAdd: Document = {
      ...newDocument,
      id: (documents.length + 1).toString(),
      uploadDate: new Date(),
    };
    setDocuments((prev) => [docToAdd, ...prev]);
    setUploadOpen(false);
  };

  const handleUpdateDocument = (updatedDocument: Document) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === updatedDocument.id ? updatedDocument : doc
      )
    );
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <DoxflowHeader
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onUploadClick={() => setUploadOpen(true)}
      />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {filteredDocuments.length > 0 ? (
          <DocumentGrid
            documents={filteredDocuments}
            onUpdateDocument={handleUpdateDocument}
            onDeleteDocument={handleDeleteDocument}
            searchQuery={searchQuery}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <FileText size={48} className="mb-4" />
            <h2 className="text-2xl font-semibold">Aucun document trouvé</h2>
            <p className="mt-2">
              {searchQuery ? "Essayez d'ajuster votre recherche." : "Commencez par télécharger un document."}
            </p>
          </div>
        )}
      </main>
      <UploadDialog
        isOpen={isUploadOpen}
        onOpenChange={setUploadOpen}
        onAddDocument={handleAddDocument}
      />
    </div>
  );
}

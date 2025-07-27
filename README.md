# DoxFlow - Plateforme de Gestion de Documents Intelligente

Bienvenue sur DoxFlow, une application web moderne conçue pour simplifier la gestion de vos documents grâce à la puissance de l'intelligence artificielle.

## Contexte

DoxFlow est une plateforme de gestion électronique de documents (GED) qui permet aux utilisateurs de télécharger, d'organiser et de retrouver facilement leurs informations. L'application intègre des fonctionnalités d'IA pour améliorer l'expérience utilisateur en automatisant des tâches complexes comme le résumé de contenu et la suggestion de catégories.

## Aspects et Fonctionnalités Clés

### Gestion de Documents
- **Téléchargement Centralisé** : Ajoutez de nouveaux documents en fournissant un titre, le contenu complet et des balises (tags) personnalisées.
- **Grille de Documents Intuitive** : Visualisez tous vos documents sous forme de cartes claires et organisées.
- **Recherche Efficace** : Retrouvez rapidement des documents en cherchant par titre ou par balise.
- **Actions Rapides** : Supprimez facilement les documents dont vous n'avez plus besoin.

### Fonctionnalités IA (propulsées par Genkit)
- **Résumé Automatique** : Obtenez un résumé concis de n'importe quel document en un seul clic, idéal pour saisir rapidement les points essentiels.
- **Suggestion Intelligente de Balises** : Laissez l'IA analyser le contenu de votre document et vous proposer des balises pertinentes pour une meilleure organisation et une recherche simplifiée.

### Interface Utilisateur
- **Aperçu Détaillé** : Ouvrez un modal pour lire le contenu complet d'un document, consulter son résumé et voir toutes ses balises.
- **Surlignage de Recherche** : Les termes recherchés sont automatiquement surlignés dans le contenu du document lors de l'aperçu, vous permettant de trouver l'information pertinente en un clin d'œil.
- **Design Moderne et Épuré** : Une interface construite avec les derniers outils pour une expérience utilisateur agréable et fluide.

## Pile Technique

- **Framework Frontend** : [Next.js](https://nextjs.org/) (avec App Router)
- **Bibliothèque UI** : [React](https://react.dev/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Style** : [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **IA Générative** : [Genkit (Firebase)](https://firebase.google.com/docs/genkit)
- **Gestion de Formulaires** : [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Pour commencer

Pour explorer le code, jetez un œil au fichier `src/app/page.tsx` qui est le point d'entrée principal de l'application. Les fonctionnalités d'intelligence artificielle se trouvent dans le dossier `src/ai/flows/`.

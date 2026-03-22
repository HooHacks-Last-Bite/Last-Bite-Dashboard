import { Header } from "@/components/dashboard/header";
import RecipeIdeas from "./recipe-ideas";

export default function IdeasPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <Header />
      <main className="flex min-h-[calc(100vh-89px)] w-full items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-3xl">
          <RecipeIdeas />
        </div>
      </main>
    </div>
  );
}
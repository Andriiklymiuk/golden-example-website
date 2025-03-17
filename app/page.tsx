'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECIPES } from '../lib/queries';
import RecipeFeed from '../components/RecipeFeed';
import CreateRecipeForm from '../components/CreateRecipeForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const { data, loading, error, refetch } = useQuery(GET_RECIPES);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <p className="text-lg text-gray-600">Loading...</p>
    </div>
  );
  if (error) return (
    <div className="min-h-screen flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <p className="text-lg text-red-500">Error: {error.message}</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-[-.01em]">
            Recipe Showcase
          </h1>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="rounded-full h-10 px-4 flex items-center gap-2 bg-foreground text-background hover:bg-[#383838]"
          >
            <Plus className="h-4 w-4" /> New Recipe
          </Button>
        </div>

        {showForm && (
          <div className="mb-8">
            <CreateRecipeForm onSuccess={() => {
              setShowForm(false);
              refetch();
            }} />
          </div>
        )}

        <RecipeFeed recipes={data?.recipes || []} />
      </div>
    </main>
  );
}
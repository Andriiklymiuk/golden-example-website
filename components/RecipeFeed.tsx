'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}

interface RecipeFeedProps {
  recipes: Recipe[];
}

export default function RecipeFeed({ recipes }: RecipeFeedProps) {
  return (
    <div className="space-y-6">
      {recipes.map((recipe) => (
        <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl">{recipe.title}</CardTitle>
            <p className="text-sm text-gray-500">
              By {recipe.user.name} • {new Date(recipe.createdAt).toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Ingredients:</h3>
              <ul className="list-disc list-inside">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Instructions:</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{recipe.instructions}</p>
            </div>
          </CardContent>
        </Card>
      ))}
      {recipes.length === 0 && (
        <p className="text-center text-gray-500">No recipes found. Create one to get started!</p>
      )}
    </div>
  );
}
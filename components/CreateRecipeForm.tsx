'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_RECIPE } from '../lib/queries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from './ui/card';

interface CreateRecipeFormProps {
  onSuccess: () => void;
}

export default function CreateRecipeForm({ onSuccess }: CreateRecipeFormProps) {
  const [formData, setFormData] = useState({
    userId: '123e4567-e89b-12d3-a456-426614174000',
    title: '',
    ingredients: '',
    instructions: '',
  });

  const [createRecipe, { loading, error }] = useMutation(CREATE_RECIPE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRecipe({
        variables: {
          input: {
            ...formData,
            ingredients: formData.ingredients.split('\n').filter(i => i.trim()),
          },
        },
      });
      setFormData({ userId: '1', title: '', ingredients: '', instructions: '' });
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Recipe Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter recipe title"
            required
          />
        </div>

        <div>
          <Label htmlFor="ingredients">Ingredients (one per line)</Label>
          <Textarea
            id="ingredients"
            value={formData.ingredients}
            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
            placeholder="Enter ingredients, one per line"
            rows={5}
            required
          />
        </div>

        <div>
          <Label htmlFor="instructions">Instructions</Label>
          <Textarea
            id="instructions"
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            placeholder="Enter cooking instructions"
            rows={5}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error.message}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Recipe'}
        </Button>
      </form>
    </Card>
  );
}
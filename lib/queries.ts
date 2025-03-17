import { gql } from '@apollo/client';

export const GET_RECIPES = gql`
  query GetRecipes($userId: ID, $query: String) {
    recipes(userId: $userId, query: $query) {
      id
      title
      ingredients
      instructions
      createdAt
      user {
        id
        name
      }
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      id
      title
      ingredients
      instructions
      createdAt
      user {
        id
        name
      }
    }
  }
`;
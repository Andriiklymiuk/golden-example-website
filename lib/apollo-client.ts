'use client';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY || 'your-api-key-here',
      },
    }),
    cache: new InMemoryCache(),
  });
};
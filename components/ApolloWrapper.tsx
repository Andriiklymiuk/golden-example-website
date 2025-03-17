'use client';

import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from '@/lib/apollo-client';
import { ReactNode } from 'react';

const client = createApolloClient();

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
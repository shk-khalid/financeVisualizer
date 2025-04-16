'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useSWRConfig } from 'swr';

interface MutationContextType {
  isLoading: boolean;
  startMutation: () => void;
  endMutation: (success?: boolean) => void;
  triggerRevalidation: () => Promise<void>;
}

const MutationContext = createContext<MutationContextType | undefined>(undefined);

export function MutationProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const startMutation = useCallback(() => {
    setIsLoading(true);
  }, []);

  const endMutation = useCallback((success = true) => {
    setIsLoading(false);
  }, []);

  const triggerRevalidation = useCallback(async () => {
    // Revalidate all data that might be affected by mutations
    await Promise.all([
      mutate('/api/transactions'),
      mutate((key) => typeof key === 'string' && key.startsWith('/api/budgets')),
    ]);
  }, [mutate]);

  return (
    <MutationContext.Provider
      value={{
        isLoading,
        startMutation,
        endMutation,
        triggerRevalidation,
      }}
    >
      {children}
    </MutationContext.Provider>
  );
}

export function useMutation() {
  const context = useContext(MutationContext);
  if (context === undefined) {
    throw new Error('useMutation must be used within a MutationProvider');
  }
  return context;
} 
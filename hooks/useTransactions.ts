import useSWR from 'swr';
import type { Transaction } from '@/lib/models/Transaction';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useTransactions() {
  const { data, error, isLoading, mutate } = useSWR<Transaction[]>('/api/transactions', fetcher, {
    refreshInterval: 5000 // Refresh every 5 seconds
  });

  return {
    transactions: data || [],
    isLoading,
    isError: error,
    mutate
  };
}
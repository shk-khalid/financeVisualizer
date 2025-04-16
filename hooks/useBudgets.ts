import useSWR from 'swr';
import type { Budget } from '@/lib/models/Budget';
import { format } from 'date-fns';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useBudgets(month = format(new Date(), 'yyyy-MM')) {
  const { data, error, isLoading, mutate } = useSWR<Budget[]>(
    `/api/budgets?month=${month}`,
    fetcher,
    { refreshInterval: 5000 }
  );

  return {
    budgets: data || [],
    isLoading,
    isError: error,
    mutate
  };
}
'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO, startOfMonth } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartSkeleton } from '@/components/ui/loading-state';
import { useTransactions } from '@/hooks/useTransactions';
import { BarChart2 } from 'lucide-react';

interface MonthlyData {
  month: string;
  total: number;
}

export default function MonthlyExpensesChart() {
  const { transactions, isLoading } = useTransactions();
  
  const monthlyData = useMemo(() => {
    if (!transactions.length) return [];
    
    // Calculate monthly totals
    const monthlyTotals = transactions.reduce((acc, transaction) => {
      const monthStart = startOfMonth(parseISO(transaction.date));
      const monthKey = format(monthStart, 'yyyy-MM');
      acc[monthKey] = (acc[monthKey] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    // Convert to chart data
    return Object.entries(monthlyTotals)
      .map(([month, total]) => ({
        // Append day to month so it can be parsed as a date, then format it as 'MMM yyyy'
        month: format(parseISO(`${month}-01`), 'MMM yyyy'),
        total,
      }))
      .sort((a, b) => {
        // Sort by date based on the raw year-month value
        return new Date(a.month).getTime() - new Date(b.month).getTime();
      });
  }, [transactions]);

  const EmptyState = () => (
    <div className="h-full flex flex-col items-center justify-center text-center p-4">
      <BarChart2 className="h-16 w-16 text-[#bf9c68] mb-4" />
      <h3 className="text-lg font-medium text-[#574120] mb-2">No monthly data to display</h3>
      <p className="text-[#7a5f38] max-w-md">
        Add transactions from different months to see your spending trends over time.
      </p>
    </div>
  );

  return (
    <Card className="border-[#7a5f38]">
      <CardHeader className="border-b border-[#bf9c68]">
        <CardTitle className="text-[#574120]">Monthly Expenses</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] pt-4">
        {isLoading ? (
          <ChartSkeleton />
        ) : monthlyData.length === 0 ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#9c7e50" />
              <XAxis dataKey="month" stroke="#574120" tick={{ fill: '#574120' }} />
              <YAxis stroke="#574120" tick={{ fill: '#574120' }} />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Total']}
                contentStyle={{
                  backgroundColor: '#e1bb80',
                  border: '1px solid #9c7e50',
                  borderRadius: '4px',
                }}
              />
              <Bar dataKey="total" fill="#7a5f38" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

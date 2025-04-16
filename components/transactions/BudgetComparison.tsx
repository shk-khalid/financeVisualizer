'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBudgets } from '@/hooks/useBudgets';
import { useTransactions } from '@/hooks/useTransactions';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { CATEGORIES } from '@/lib/models/Transaction';
import { ChartSkeleton } from '@/components/ui/loading-state';
import { AreaChart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BudgetComparison() {
  const { budgets, isLoading: isLoadingBudgets } = useBudgets();
  const { transactions, isLoading: isLoadingTransactions } = useTransactions();

  const currentMonth = format(new Date(), 'yyyy-MM');
  const startOfCurrentMonth = startOfMonth(new Date());
  const endOfCurrentMonth = endOfMonth(new Date());

  const chartData = useMemo(() => {
    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startOfCurrentMonth && transactionDate <= endOfCurrentMonth;
    });

    return CATEGORIES.map(category => {
      const budget = budgets.find(b => b.category === category)?.amount || 0;
      const actual = currentMonthTransactions
        .filter(t => t.category === category)
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        category,
        budget,
        actual,
        remaining: Math.max(0, budget - actual),
      };
    });
  }, [transactions, budgets, startOfCurrentMonth, endOfCurrentMonth]);

  // Check if we have any actual budget data to display
  const hasBudgetData = useMemo(() => {
    return budgets.length > 0;
  }, [budgets]);

  // Check if we have any actual transaction data in the current month
  const hasTransactionData = useMemo(() => {
    return transactions.some(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startOfCurrentMonth && transactionDate <= endOfCurrentMonth;
    });
  }, [transactions, startOfCurrentMonth, endOfCurrentMonth]);

  const EmptyState = () => (
    <div className="h-full flex flex-col items-center justify-center text-center p-4">
      <AreaChart className="h-16 w-16 text-[#bf9c68] mb-4" />
      <h3 className="text-lg font-medium text-[#574120] mb-2">No budget comparison data</h3>
      {!hasBudgetData ? (
        <div>
          <p className="text-[#7a5f38] max-w-md mb-4">
            Set up monthly budgets for your categories to see how your actual spending compares.
          </p>
          <Button 
            className="bg-[#574120] hover:bg-[#352208] text-white mt-2"
            onClick={() => document.getElementById('budget-form-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Set a Budget <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ) : !hasTransactionData ? (
        <p className="text-[#7a5f38] max-w-md">
          You have budgets set, but no transactions in the current month to compare against.
        </p>
      ) : (
        <p className="text-[#7a5f38] max-w-md">
          Something went wrong with the comparison data. Please try refreshing the page.
        </p>
      )}
    </div>
  );

  if (isLoadingBudgets || isLoadingTransactions) {
    return (
      <Card className="border-[#7a5f38]">
        <CardHeader className="border-b border-[#bf9c68]">
          <CardTitle className="text-[#574120]">Budget vs. Actual Spending</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ChartSkeleton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#7a5f38]">
      <CardHeader className="border-b border-[#bf9c68]">
        <CardTitle className="text-[#574120]">Budget vs. Actual Spending</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] pt-4">
        {!hasBudgetData || !hasTransactionData ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#9c7e50" />
              <XAxis 
                dataKey="category" 
                stroke="#574120"
                tick={{ fill: '#574120' }}
              />
              <YAxis 
                stroke="#574120"
                tick={{ fill: '#574120' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#e1bb80',
                  border: '1px solid #9c7e50',
                  borderRadius: '4px',
                }}
              />
              <Legend />
              <Bar 
                dataKey="budget" 
                name="Budget" 
                fill="#7a5f38" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="actual" 
                name="Actual" 
                fill="#bf9c68"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
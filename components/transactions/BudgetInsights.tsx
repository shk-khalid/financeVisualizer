'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBudgets } from '@/hooks/useBudgets';
import { useTransactions } from '@/hooks/useTransactions';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { AlertTriangle, CheckCircle, ArrowRight, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { CardSkeleton } from '@/components/ui/loading-state';
import { Button } from '@/components/ui/button';

export default function BudgetInsights() {
  const { budgets, isLoading: isLoadingBudgets } = useBudgets();
  const { transactions, isLoading: isLoadingTransactions } = useTransactions();

  const insights = useMemo(() => {
    if (isLoadingBudgets || isLoadingTransactions) return [];

    const currentMonth = format(new Date(), 'yyyy-MM');
    const startOfCurrentMonth = startOfMonth(new Date());
    const endOfCurrentMonth = endOfMonth(new Date());

    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startOfCurrentMonth && transactionDate <= endOfCurrentMonth;
    });

    const categoryInsights = budgets.map(budget => {
      const actual = currentMonthTransactions
        .filter(t => t.category === budget.category)
        .reduce((sum, t) => sum + t.amount, 0);

      const percentageUsed = (actual / budget.amount) * 100;
      const remaining = budget.amount - actual;

      let status: 'danger' | 'warning' | 'success' = 'success';
      if (percentageUsed >= 100) status = 'danger';
      else if (percentageUsed >= 80) status = 'warning';

      return {
        category: budget.category,
        percentageUsed,
        remaining,
        status,
      };
    });

    return categoryInsights;
  }, [budgets, transactions, isLoadingBudgets, isLoadingTransactions]);

  const EmptyState = () => (
    <div className="h-[300px] flex flex-col items-center justify-center text-center p-4">
      <LineChart className="h-16 w-16 text-[#bf9c68] mb-4" />
      <h3 className="text-lg font-medium text-[#574120] mb-2">No budget insights available</h3>
      <p className="text-[#7a5f38] max-w-md mb-4">
        Set monthly budgets for your categories to track spending and get insights on your budget performance.
      </p>
      <Button 
        className="bg-[#574120] hover:bg-[#352208] text-white mt-2"
        onClick={() => document.getElementById('budget-form-section')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Set Your First Budget <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );

  if (isLoadingBudgets || isLoadingTransactions) {
    return <CardSkeleton contentHeight="h-[300px]" />;
  }

  return (
    <Card className="border-[#7a5f38]">
      <CardHeader className="border-b border-[#bf9c68]">
        <CardTitle className="text-[#574120]">Budget Insights</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {budgets.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.category}
                className="p-3 rounded-lg bg-[#f5e1c4] border border-[#bf9c68]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-[#574120]">{insight.category}</h3>
                  {insight.status === 'danger' && (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                  {insight.status === 'warning' && (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  )}
                  {insight.status === 'success' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="w-full bg-[#deb887] rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      insight.status === 'danger'
                        ? 'bg-red-500'
                        : insight.status === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(insight.percentageUsed, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-[#7a5f38]">
                    {insight.percentageUsed.toFixed(0)}% used
                  </span>
                  <span className="text-sm text-[#7a5f38]">
                    ${insight.remaining.toFixed(2)} remaining
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
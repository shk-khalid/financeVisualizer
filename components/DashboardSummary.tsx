'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CATEGORIES } from '@/lib/models/Transaction';
import { useTransactions } from '@/hooks/useTransactions';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export default function DashboardSummary() {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-[#e1bb80]/20 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const categoryTotals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  // Calculate month-over-month change safely (handle potential division by zero)
  const currentMonth = new Date().getMonth();
  const currentMonthTotal = transactions
    .filter(t => new Date(t.date).getMonth() === currentMonth)
    .reduce((sum, t) => sum + t.amount, 0);

  const lastMonthTotal = transactions
    .filter(t => new Date(t.date).getMonth() === currentMonth - 1)
    .reduce((sum, t) => sum + t.amount, 0);

  const monthOverMonthChange =
    lastMonthTotal !== 0
      ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Expenses Card */}
      <motion.div
        className="col-span-full lg:col-span-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border border-[#a67c52] rounded-xl shadow-lg">
          <CardHeader className="border-b border-[#c9a66b] p-4">
            <CardTitle className="text-xl font-semibold text-[#5e4b3c] flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-[#574120]" />
              <span>Total Expenses</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-4xl font-bold text-[#352208]">
              ${totalExpenses.toFixed(2)}
            </div>
            <div className="flex items-center mt-2">
              {monthOverMonthChange > 0 ? (
                <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
              )}
              <span className={`text-sm ${monthOverMonthChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {Math.abs(monthOverMonthChange).toFixed(1)}% vs last month
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category Breakdown Card */}
      <motion.div
        className="col-span-full lg:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
         <Card className="border border-[#a67c52] rounded-xl shadow-lg">
          <CardHeader className="border-b border-[#c9a66b] p-4">
            <CardTitle className="text-xl font-semibold text-[#5e4b3c]">
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex flex-col space-y-1 p-3 rounded-lg bg-[#e1bb80]/10"
                >
                  <p className="text-sm font-medium text-[#7a5f38]">{category}</p>
                  <p className="text-xl font-bold text-[#574120]">
                    ${(categoryTotals[category] || 0).toFixed(2)}
                  </p>
                  <div className="h-1 bg-[#9c7e50]/20 rounded-full mt-2">
                    <div
                      className="h-full bg-[#574120] rounded-full"
                      style={{
                        width: `${((categoryTotals[category] || 0) / totalExpenses) * 100}%`
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

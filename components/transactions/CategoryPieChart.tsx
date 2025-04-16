'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartSkeleton } from '@/components/ui/loading-state';
import { useTransactions } from '@/hooks/useTransactions';
import { PiggyBank } from 'lucide-react';

const COLORS = ['#e1bb80', '#bf9c68', '#9c7e50', '#7a5f38', '#574120', '#352208'];

export default function CategoryPieChart() {
  const { transactions, isLoading } = useTransactions();
  
  const categoryData = useMemo(() => {
    if (!transactions.length) return [];
    
    const categoryTotals = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals)
      .map(([category, total]) => ({
        name: category,
        value: total,
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const EmptyState = () => (
    <div className="h-full flex flex-col items-center justify-center text-center p-4">
      <PiggyBank className="h-16 w-16 text-[#bf9c68] mb-4" />
      <h3 className="text-lg font-medium text-[#574120] mb-2">No expenses to display</h3>
      <p className="text-[#7a5f38] max-w-md">
        Add some transactions to see your spending distribution across categories.
      </p>
    </div>
  );

  return (
    <Card className="border-[#7a5f38]">
      <CardHeader className="border-b border-[#bf9c68]">
        <CardTitle className="text-[#574120]">Category Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] pt-4">
        {isLoading ? (
          <ChartSkeleton />
        ) : categoryData.length === 0 ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => 
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Total']}
                contentStyle={{
                  backgroundColor: '#e1bb80',
                  border: '1px solid #9c7e50',
                  borderRadius: '4px',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
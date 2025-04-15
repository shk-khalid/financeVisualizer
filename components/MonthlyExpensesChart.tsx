'use client';

import { useEffect, useState } from 'react';
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

interface Transaction {
  _id: string;
  amount: number;
  date: string;
}

interface MonthlyData {
  month: string;
  total: number;
}

export default function MonthlyExpensesChart() {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const response = await fetch('/api/transactions');
        const transactions: Transaction[] = await response.json();

        // Calculate monthly totals
        const monthlyTotals = transactions.reduce((acc, transaction) => {
          const monthStart = startOfMonth(parseISO(transaction.date));
          const monthKey = format(monthStart, 'yyyy-MM');
          acc[monthKey] = (acc[monthKey] || 0) + transaction.amount;
          return acc;
        }, {} as Record<string, number>);

        // Convert to chart data
        const chartData: MonthlyData[] = Object.entries(monthlyTotals)
          .map(([month, total]) => ({
            // Append day to month so it can be parsed as a date, then format it as 'MMM yyyy'
            month: format(parseISO(`${month}-01`), 'MMM yyyy'),
            total,
          }))
          .sort((a, b) => {
            // Sort by date based on the raw year-month value
            return new Date(a.month).getTime() - new Date(b.month).getTime();
          });

        setMonthlyData(chartData);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessData();
  }, []);

  if (loading) {
    return <div>Loading chart data...</div>;
  }

  return (
    <div className="h-[400px] w-full">
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
    </div>
  );
}

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

export default function MonthlyExpensesChart() {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const response = await fetch('/api/transactions');
        const transactions: Transaction[] = await response.json();

        const monthlyTotals = transactions.reduce((acc, transaction) => {
          const monthStart = startOfMonth(parseISO(transaction.date));
          const monthKey = format(monthStart, 'yyyy-MM');
          
          acc[monthKey] = (acc[monthKey] || 0) + transaction.amount;
          return acc;
        }, {} as Record<string, number>);

        const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
          month: format(parseISO(month), 'MMM yyyy'),
          total,
        })).sort((a, b) => a.month.localeCompare(b.month));

        setMonthlyData(chartData);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchAndProcessData();
  }, []);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#9c7e50" />
          <XAxis 
            dataKey="month" 
            stroke="#574120"
            tick={{ fill: '#574120' }}
          />
          <YAxis 
            stroke="#574120"
            tick={{ fill: '#574120' }}
          />
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Total']}
            contentStyle={{
              backgroundColor: '#e1bb80',
              border: '1px solid #9c7e50',
              borderRadius: '4px',
            }}
          />
          <Bar 
            dataKey="total" 
            fill="#7a5f38"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
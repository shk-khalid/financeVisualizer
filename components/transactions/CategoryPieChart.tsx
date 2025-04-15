'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Transaction } from '@/lib/models/Transaction';

const COLORS = ['#e1bb80', '#bf9c68', '#9c7e50', '#7a5f38', '#574120', '#352208'];

export default function CategoryPieChart() {
  const [categoryData, setCategoryData] = useState<{ name: string; value: number; }[]>([]);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const response = await fetch('/api/transactions');
        const transactions: Transaction[] = await response.json();

        const categoryTotals = transactions.reduce((acc, transaction) => {
          acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
          return acc;
        }, {} as Record<string, number>);

        const chartData = Object.entries(categoryTotals).map(([category, total]) => ({
          name: category,
          value: total,
        })).sort((a, b) => b.value - a.value);

        setCategoryData(chartData);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchAndProcessData();
  }, []);

  return (
    <div className="h-[400px] w-full">
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
    </div>
  );
}
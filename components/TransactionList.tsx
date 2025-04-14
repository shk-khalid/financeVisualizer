'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description?: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      if (!response.ok) throw new Error('Failed to fetch transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [refreshKey]);

  if (isLoading) {
    return <div className="text-center py-4 text-[#574120]">Loading transactions...</div>;
  }

  if (transactions.length === 0) {
    return <div className="text-center py-4 text-[#574120]">No transactions found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#9c7e50]">
            <TableHead className="text-[#574120]">Date</TableHead>
            <TableHead className="text-[#574120]">Description</TableHead>
            <TableHead className="text-right text-[#574120]">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow 
              key={transaction._id}
              className="border-b border-[#bf9c68] hover:bg-[#e1bb80]/10"
            >
              <TableCell className="text-[#7a5f38]">
                {format(new Date(transaction.date), 'PP')}
              </TableCell>
              <TableCell className="text-[#7a5f38]">
                {transaction.description || '-'}
              </TableCell>
              <TableCell className="text-right font-medium text-[#574120]">
                ${transaction.amount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
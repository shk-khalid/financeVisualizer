'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { motion, AnimatePresence } from 'framer-motion';
import TransactionForm from '@/components/transactions/TransactionForm';
import { useTransactions } from '@/hooks/useTransactions';
import type { Transaction } from '@/lib/models/Transaction';

export default function TransactionList() {
  const { transactions, isLoading, mutate } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);

  const handleDelete = async () => {
    if (!deletingTransaction) return;

    try {
      const response = await fetch(`/api/transactions?id=${deletingTransaction._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete transaction');
      
      await mutate();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    } finally {
      setDeletingTransaction(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#574120]"></div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 bg-[#e1bb80]/10 rounded-lg">
        <h3 className="text-xl font-semibold text-[#574120] mb-2">No Transactions Yet</h3>
        <p className="text-[#7a5f38]">Start by adding your first transaction above.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-[#9c7e50] bg-white/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#9c7e50] bg-[#e1bb80]/20">
              <TableHead className="text-[#574120] font-bold">Date</TableHead>
              <TableHead className="text-[#574120] font-bold">Category</TableHead>
              <TableHead className="text-[#574120] font-bold">Description</TableHead>
              <TableHead className="text-right text-[#574120] font-bold">Amount</TableHead>
              <TableHead className="text-right text-[#574120] font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {transactions.map((transaction) => (
                <motion.tr
                  key={transaction._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border-b border-[#bf9c68] hover:bg-[#e1bb80]/10 transition-colors"
                >
                  <TableCell className="text-[#7a5f38] font-medium">
                    {format(new Date(transaction.date), 'PP')}
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#574120] text-white">
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-[#7a5f38]">
                    {transaction.description || '-'}
                  </TableCell>
                  <TableCell className="text-right font-bold text-[#574120]">
                    ${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingTransaction(transaction)}
                      className="hover:bg-[#e1bb80]/20"
                    >
                      <Pencil className="h-4 w-4 text-[#574120]" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingTransaction(transaction)}
                      className="hover:bg-[#e1bb80]/20"
                    >
                      <Trash2 className="h-4 w-4 text-[#574120]" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#574120] text-xl">Edit Transaction</DialogTitle>
          </DialogHeader>
          {editingTransaction && (
            <TransactionForm
              initialData={editingTransaction}
              onSuccess={() => {
                setEditingTransaction(null);
                mutate();
              }}
              onCancel={() => setEditingTransaction(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingTransaction} onOpenChange={() => setDeletingTransaction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#574120]">Delete Transaction</AlertDialogTitle>
            <AlertDialogDescription className="text-[#7a5f38]">
              Are you sure you want to delete this transaction? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#9c7e50] text-[#574120]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
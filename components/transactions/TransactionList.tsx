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
import { Pencil, Trash2, PlusCircle, Receipt } from 'lucide-react';
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
import { TableRowsSkeleton } from '@/components/ui/loading-state';
import { useMutation } from '@/contexts/MutationContext';

export default function TransactionList() {
  const { transactions, isLoading, mutate } = useTransactions();
  const { startMutation, endMutation, triggerRevalidation } = useMutation();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);

  const handleDelete = async () => {
    if (!deletingTransaction) return;

    startMutation();
    try {
      const response = await fetch(`/api/transactions?id=${deletingTransaction._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete transaction');
      
      await triggerRevalidation();
      
      endMutation(true);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      endMutation(false);
    } finally {
      setDeletingTransaction(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <TableRowsSkeleton rows={5} columns={5} />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="h-[300px] flex flex-col items-center justify-center text-center p-8 bg-[#e1bb80]/10 rounded-lg">
        <Receipt className="h-16 w-16 text-[#bf9c68] mb-4" />
        <h3 className="text-xl font-semibold text-[#574120] mb-2">No Transactions Yet</h3>
        <p className="text-[#7a5f38] mb-4">
          Track your expenses by adding transactions. You'll be able to see spending patterns and insights over time.
        </p>
        <Button 
          className="bg-[#574120] hover:bg-[#352208] text-white mt-2 flex items-center"
          onClick={() => document.getElementById('transaction-form-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Your First Transaction
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-[#9c7e50] bg-[#f5e1c4]/50 backdrop-blur-sm">
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
                  className="border-b border-[#bf9c68] hover:bg-[#e1bb80]/20 transition-colors"
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
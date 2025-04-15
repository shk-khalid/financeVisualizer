'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/models/Transaction';
import { useTransactions } from '@/hooks/useTransactions';
import type { TransactionCategory, Transaction } from '@/lib/models/Transaction';
import { motion } from 'framer-motion';

interface TransactionFormData {
  amount: number;
  date: Date;
  description?: string;
  category: TransactionCategory;
}

interface TransactionFormProps {
  initialData?: Transaction;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function TransactionForm({ initialData, onSuccess, onCancel }: TransactionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useTransactions();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<TransactionFormData>({
    defaultValues: initialData ? {
      ...initialData,
      date: new Date(initialData.date)
    } : undefined
  });
  const [date, setDate] = useState<Date | undefined>(initialData?.date ? new Date(initialData.date) : undefined);
  const [category, setCategory] = useState<TransactionCategory | undefined>(initialData?.category);

  const onSubmit = async (data: TransactionFormData) => {
    if (!date || !category) return;
    
    setIsSubmitting(true);
    try {
      const url = initialData 
        ? `/api/transactions?id=${initialData._id}`
        : '/api/transactions';
      
      const method = initialData ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, date, category }),
      });

      if (!response.ok) throw new Error('Failed to save transaction');
      
      setValue('amount', 0);
      setValue('description', '');
      setDate(undefined);
      setCategory(undefined);
      
      await mutate();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-[#574120]">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="Enter amount"
          className="border-[#9c7e50] focus:border-[#574120] focus:ring-[#574120]"
          {...register('amount', { required: 'Amount is required' })}
        />
        {errors.amount && (
          <p className="text-sm text-red-500">{errors.amount.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-[#574120]">Category</Label>
        <Select value={category} onValueChange={(value: TransactionCategory) => setCategory(value)}>
          <SelectTrigger className="border-[#9c7e50] focus:border-[#574120] focus:ring-[#574120]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-[#574120]">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal border-[#9c7e50] hover:bg-[#e1bb80]/10',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="bg-white"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-[#574120]">Description (Optional)</Label>
        <Input
          id="description"
          placeholder="Enter description"
          className="border-[#9c7e50] focus:border-[#574120] focus:ring-[#574120]"
          {...register('description')}
        />
      </div>

      <div className="flex gap-4">
        <Button 
          type="submit" 
          className="flex-1 bg-[#574120] hover:bg-[#352208] text-white" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialData ? 'Updating...' : 'Adding...'}
            </>
          ) : (
            initialData ? 'Update' : 'Add Transaction'
          )}
        </Button>
        {onCancel && (
          <Button 
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 border-[#9c7e50] text-[#574120] hover:bg-[#e1bb80]/10"
          >
            Cancel
          </Button>
        )}
      </div>
    </motion.form>
  );
}
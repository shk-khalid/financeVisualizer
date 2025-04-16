'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { FormSkeleton } from '@/components/ui/loading-state';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation } from '@/contexts/MutationContext';

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
  const { startMutation, endMutation, triggerRevalidation } = useMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TransactionFormData>({
    defaultValues: initialData ? {
      ...initialData,
      date: new Date(initialData.date)
    } : undefined
  });

  const onSubmit = async (data: TransactionFormData) => {
    setIsSubmitting(true);
    startMutation();
    
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
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save transaction');
      
      // Reset form fields upon success.
      setValue('amount', 0);
      setValue('description', '');
      // Optionally, you could also reset the date and category using reset() if needed.
      
      await triggerRevalidation();
      
      if (onSuccess) {
        onSuccess();
      }
      
      endMutation(true);
    } catch (error) {
      console.error('Error saving transaction:', error);
      endMutation(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-[#7a5f38]">
      <CardHeader className="border-b border-[#bf9c68]">
        <CardTitle className="text-[#574120]">
          {initialData ? 'Edit Transaction' : 'Add Transaction'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-5">
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isSubmitting ? (
            <FormSkeleton fields={3} />
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-[#574120]">Amount</Label>
                <Input 
                  id="amount"
                  type="number"
                  step="0.01"
                  {...register('amount', { required: true, min: 0.01 })}
                  className={cn(
                    "border-[#9c7e50] focus:border-[#574120] focus:ring-[#574120]/30",
                    errors.amount && "border-red-500"
                  )}
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm">Please enter a valid amount</p>
                )}
              </div>

              <Controller
                control={control}
                name="category"
                rules={{ required: 'Please select a category' }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-[#574120]">Category</Label>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger 
                        id="category"
                        className={cn(
                          "border-[#9c7e50] focus:border-[#574120] focus:ring-[#574120]/30",
                          errors.category ? "border-red-500" : (!field.value ? "text-muted-foreground" : "")
                        )}
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-red-500 text-sm">{errors.category.message}</p>
                    )}
                  </div>
                )}
              />

              <Controller
                control={control}
                name="date"
                rules={{ required: 'Please select a date' }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-[#574120]">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full border-[#9c7e50] focus:border-[#574120] focus:ring-[#574120]/30 justify-start text-left font-normal",
                            errors.date ? "border-red-500" : (!field.value ? "text-muted-foreground" : "")
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, 'PPP') : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && (
                      <p className="text-red-500 text-sm">{errors.date.message}</p>
                    )}
                  </div>
                )}
              />

              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#574120]">Description (Optional)</Label>
                <Input 
                  id="description"
                  {...register('description')}
                  className="border-[#9c7e50] focus:border-[#574120] focus:ring-[#574120]/30"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                {onCancel && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onCancel}
                    className="border-[#9c7e50] text-[#574120]"
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#574120] hover:bg-[#352208] text-white"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {initialData ? 'Update' : 'Add'} Transaction
                </Button>
              </div>
            </>
          )}
        </motion.form>
      </CardContent>
    </Card>
  );
}

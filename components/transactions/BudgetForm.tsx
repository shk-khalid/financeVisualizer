'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { CATEGORIES } from '@/lib/models/Transaction';
import { useBudgets } from '@/hooks/useBudgets';
import type { TransactionCategory } from '@/lib/models/Transaction';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation } from '@/contexts/MutationContext';
import { FormSkeleton } from '@/components/ui/loading-state';

interface BudgetFormData {
  amount: number;
  category: TransactionCategory;
}

export default function BudgetForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useBudgets();
  const { startMutation, endMutation, triggerRevalidation } = useMutation();
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<BudgetFormData>();
  const [category, setCategory] = useState<TransactionCategory | undefined>();

  const onSubmit = async (data: BudgetFormData) => {
    if (!category) return;
    
    setIsSubmitting(true);
    startMutation();
    
    try {
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          category,
          month: format(new Date(), 'yyyy-MM'),
        }),
      });

      if (!response.ok) throw new Error('Failed to save budget');
      
      reset();
      setCategory(undefined);
      
      // Trigger all components to update
      await triggerRevalidation();
      
      endMutation(true);
    } catch (error) {
      console.error('Error saving budget:', error);
      endMutation(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-[#7a5f38]">
      <CardHeader className="border-b border-[#bf9c68]">
        <CardTitle className="text-[#574120]">Set Monthly Budget</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-5">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {isSubmitting ? (
            <FormSkeleton fields={2} />
          ) : (
            <>
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
                <Label htmlFor="amount" className="text-[#574120]">Budget Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="Enter budget amount"
                  className="border-[#9c7e50] focus:border-[#574120] focus:ring-[#574120]"
                  {...register('amount', { 
                    required: 'Budget amount is required',
                    min: { value: 0, message: 'Budget amount must be positive' }
                  })}
                />
                {errors.amount && (
                  <p className="text-sm text-red-500">{errors.amount.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#574120] hover:bg-[#352208] text-white" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting Budget...
                  </>
                ) : (
                  'Set Budget'
                )}
              </Button>
            </>
          )}
        </motion.form>
      </CardContent>
    </Card>
  );
}
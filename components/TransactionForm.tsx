'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionFormData {
  amount: number;
  date: Date;
  description?: string;
}

export default function TransactionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<TransactionFormData>();
  const [date, setDate] = useState<Date>();

  const onSubmit = async (data: TransactionFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, date: date }),
      });

      if (!response.ok) throw new Error('Failed to create transaction');
      
      setValue('amount', 0);
      setValue('description', '');
      setDate(undefined);
      
      window.location.reload();
    } catch (error) {
      console.error('Error creating transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <Button 
        type="submit" 
        className="w-full bg-[#574120] hover:bg-[#352208] text-white" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding...' : 'Add Transaction'}
      </Button>
    </form>
  );
}
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-[#bf9c68] bg-[#f9f4ea] px-3 py-2 text-sm text-[#574120] ring-offset-[#f9f4ea] placeholder:text-[#9c7e50]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6024] focus-visible:ring-offset-2 focus-visible:border-[#8c6024] hover:border-[#9c7e50] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#f5e1c4]/30',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };

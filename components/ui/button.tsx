import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-[#f9f4ea] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6024] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#8c6024] text-white hover:bg-[#6d4a1c] active:bg-[#574120]',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
        outline:
          'border border-[#bf9c68] bg-transparent text-[#574120] hover:bg-[#f5e1c4]/50 hover:text-[#574120] active:bg-[#f5e1c4]/70',
        secondary:
          'bg-[#e1bb80] text-[#574120] hover:bg-[#d4a96b] active:bg-[#c9a66b]',
        ghost: 'text-[#574120] hover:bg-[#f5e1c4]/50 hover:text-[#574120] active:bg-[#f5e1c4]/70',
        link: 'text-[#8c6024] underline-offset-4 hover:underline hover:text-[#6d4a1c] active:text-[#574120]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

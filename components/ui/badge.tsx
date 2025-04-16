import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#8c6024] focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[#8c6024] text-white hover:bg-[#6d4a1c]',
        secondary:
          'border-transparent bg-[#e1bb80] text-[#574120] hover:bg-[#d4a96b]',
        destructive:
          'border-transparent bg-red-600 text-white hover:bg-red-700',
        outline: 'text-[#574120] border-[#bf9c68]',
        success: 'border-transparent bg-green-600 text-white hover:bg-green-700',
        warning: 'border-transparent bg-yellow-600 text-white hover:bg-yellow-700',
        info: 'border-transparent bg-[#9c7e50] text-white hover:bg-[#7a5f38]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

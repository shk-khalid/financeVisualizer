'use client';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface CardSkeletonProps {
  className?: string;
  header?: boolean;
  headerHeight?: string;
  contentHeight?: string;
}

export function CardSkeleton({ 
  className, 
  header = true, 
  headerHeight = 'h-10', 
  contentHeight = 'h-[300px]' 
}: CardSkeletonProps) {
  return (
    <div className={cn('rounded-lg border border-[#7a5f38] bg-[#f5e1c4]/50 overflow-hidden', className)}>
      {header && (
        <div className="border-b border-[#bf9c68] p-4">
          <Skeleton className={cn('w-1/3 bg-[#e1bb80]/30', headerHeight)} />
        </div>
      )}
      <div className="p-4">
        <Skeleton className={cn('w-full bg-[#e1bb80]/30', contentHeight)} />
      </div>
    </div>
  );
}

export function ChartSkeleton({ className, height = 'h-[400px]' }: { className?: string; height?: string }) {
  return (
    <div className={cn('w-full flex items-center justify-center bg-[#f5e1c4]/30 rounded-md', height, className)}>
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#574120]"></div>
        <Skeleton className="w-32 h-4 bg-[#e1bb80]/30" />
      </div>
    </div>
  );
}

export function TableRowsSkeleton({ 
  rows = 5, 
  columns = 4, 
  className 
}: { 
  rows?: number; 
  columns?: number; 
  className?: string 
}) {
  return (
    <div className={cn('space-y-3 p-4 bg-[#f5e1c4]/30 rounded-md', className)}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton 
              key={`${rowIndex}-${colIndex}`} 
              className={cn(
                'h-6 bg-[#e1bb80]/30', 
                colIndex === 0 ? 'w-1/4' : 'flex-1'
              )} 
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function DashboardCardsSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: cards }).map((_, i) => (
        <Skeleton key={i} className="h-32 bg-[#e1bb80]/30 rounded-lg" />
      ))}
    </div>
  );
}

export function FormSkeleton({ fields = 3 }: { fields?: number }) {
  return (
    <div className="space-y-4 bg-[#f5e1c4]/20 p-4 rounded-md">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24 bg-[#e1bb80]/30" />
          <Skeleton className="h-10 w-full bg-[#e1bb80]/30" />
        </div>
      ))}
      <Skeleton className="h-10 w-1/3 mt-6 bg-[#e1bb80]/30" />
    </div>
  );
} 
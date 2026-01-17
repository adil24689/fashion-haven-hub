import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  isLoading?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showLoadMore = false,
  onLoadMore,
  isLoading = false,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('ellipsis');
      }
      
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  if (showLoadMore) {
    return (
      <div className="text-center mt-12">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={onLoadMore}
          disabled={isLoading}
          className="min-w-[200px]"
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Loading...
            </>
          ) : (
            <>
              Load More Products
              <ChevronRight className="ml-2" size={18} />
            </>
          )}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Showing {currentPage * 12} of {totalPages * 12} products
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={18} />
      </Button>
      
      {getPageNumbers().map((page, index) => (
        page === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="px-2">
            <MoreHorizontal size={18} className="text-muted-foreground" />
          </span>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            size="icon"
            onClick={() => onPageChange(page)}
            className={cn(
              currentPage === page && 'bg-accent text-accent-foreground hover:bg-accent/90'
            )}
          >
            {page}
          </Button>
        )
      ))}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={18} />
      </Button>
    </div>
  );
};

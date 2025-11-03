import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/lib/ui/pagination"

export type PDFViewerPaginationProps = {
  currentPage: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
}

export function PDFViewerPagination({ currentPage, totalPages, onPrevious, onNext }: PDFViewerPaginationProps) {
  return (
    <div className="absolute bottom-4 inset-x-4 z-10">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              size="icon"
              disabled={currentPage === 1}
              onClick={onPrevious}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              isActive
              size="default"
              className="pointer-events-none tabular-nums"
            >
              {currentPage} / {totalPages}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              size="icon"
              disabled={currentPage === totalPages}
              onClick={onNext}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

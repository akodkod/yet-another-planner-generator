import { pdfjs, Document, Page, DocumentProps } from "react-pdf"
import { useCallback, useState } from "react"
import { Alert, AlertTitle, AlertDescription } from "@/lib/ui/alert"
import { AlertCircleIcon, DownloadIcon } from "lucide-react"
import { Button } from "@/lib/ui/button"
import { Link } from "@tanstack/react-router"
import { usePDF } from "@react-pdf/renderer"
import { PDFRenderer } from "@/features/pdf-renderer/pdf-renderer"
import { PDFViewerPagination } from "@/features/pdf-viewer/pdf-viewer-pagination"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

const reactPDFOptions: DocumentProps["options"] = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  wasmUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/wasm/`,
}

export type PDFViewerProps = {
  treeId: string
  width?: number
  height?: number
}

export function PDFViewer({ treeId, width, height }: PDFViewerProps) {
  const [pdf] = usePDF({
    document: (
      <PDFRenderer
        treeId={treeId}
      />
    ),
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const isLoaded = !pdf.loading && !pdf.error
  const hasError = pdf.error

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setTotalPages(numPages)
    setCurrentPage(1)
  }, [])

  return (
    <div
      className="group grid place-items-center bg-background relative"
      style={{ width, height }}
    >
      {hasError && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Unable to generate PDF</AlertTitle>
          <AlertDescription>
            <p>{pdf.error}</p>
          </AlertDescription>
        </Alert>
      )}

      {isLoaded && (
        <>
          <Document
            key={pdf.url ?? "none"}
            file={pdf.blob}
            options={reactPDFOptions}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              width={width}
              height={height}
              pageNumber={currentPage}
            />
          </Document>

          <PDFViewerPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => setCurrentPage(currentPage - 1)}
            onNext={() => setCurrentPage(currentPage + 1)}
          />

          {pdf.url && (
            <Button
              asChild
              variant="outline"
              className={`
                absolute bottom-4 right-4 z-10 opacity-0
                group-hover:opacity-100
                transition-opacity duration-200 ease-in-out
              `}
            >
              <Link
                to={pdf.url}
                download="calendar.pdf"
              >
                <DownloadIcon />
                Download
              </Link>
            </Button>
          )}
        </>
      )}
    </div>
  )
}

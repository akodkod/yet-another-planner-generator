import { pdfjs, Document, Page, DocumentProps } from "react-pdf"
import { useCallback, useState } from "react"
import { Alert, AlertTitle, AlertDescription } from "@/lib/ui/alert"
import { AlertCircleIcon, DownloadIcon } from "lucide-react"
import { Button } from "@/lib/ui/button"
import { Link } from "@tanstack/react-router"
import { usePDF } from "@react-pdf/renderer"
import { PDFRenderer, PDFRendererProps } from "@/features/pdf-renderer/pdf-renderer"
import { PDFViewerPagination } from "@/features/pdf-viewer/pdf-viewer-pagination"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { useMeasure } from "@/lib/hooks/use-measure"
import { Trees } from "@/features/trees/trees.module"
import { TreeNodeType } from "@/features/trees/tree"

const reactPDFOptions: DocumentProps["options"] = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  wasmUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/wasm/`,
}

export type PDFViewerProps = Pick<PDFRendererProps, "pageIdsToRender"> & {
  treeId: string
  pageIdsToRender?: string[]
}

export function PDFViewer({ treeId, pageIdsToRender }: PDFViewerProps) {
  const [pdf] = usePDF({
    document: (
      <PDFRenderer
        treeId={treeId}
        pageIdsToRender={pageIdsToRender}
      />
    ),
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const rootNode = Trees.useNodeOf(treeId, treeId, TreeNodeType.Root)
  const { ref, width: availableWidth, height: availableHeight } = useMeasure()

  const { pageWidth, pageHeight } = rootNode.data
  const isHeightLimited = availableHeight < pageHeight
  const scale = isHeightLimited ? availableHeight / pageHeight : availableWidth / pageWidth

  const pdfWidthScaled = pageWidth * scale
  const pdfHeightScaled = pageHeight * scale

  const isLoaded = !pdf.loading && !pdf.error
  const hasError = pdf.error

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setTotalPages(numPages)
    setCurrentPage(1)
  }, [])

  return (
    <div
      ref={ref}
      className="size-full grid place-items-center"
    >
      <div
        className="group overflow-hidden relative border-1 rounded-sm shadow-xs"
        style={{ width: pdfWidthScaled, height: pdfHeightScaled }}
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
                width={pdfWidthScaled}
                height={pdfHeightScaled}
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
    </div>
  )
}

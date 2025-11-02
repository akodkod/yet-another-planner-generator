import { ClientOnly, createFileRoute } from "@tanstack/react-router"
import { usePDF } from "@react-pdf/renderer"
import { RenderPlanner } from "@/features/chapters/chapters-renderer"
import { PDFViewer } from "@/features/pdf-viewer/pdf-viewer"
import { createIsomorphicFn } from "@tanstack/react-start"
import { pdfjs } from "react-pdf"
import { DefaultTemplateRootChapter } from "@/lib/templates/default/default"

const year = 2025
const startDate = new Date(year, 0, 1)
const endDate = new Date(year, 0, 31)
const pageWidth = 1620
const pageHeight = 2160

export const Route = createFileRoute("/")({
  ssr: false,
  loader: () => setupPDFViewer(),
  component: RouteComponent,
})

function RouteComponent() {
  const [pdf] = usePDF({
    document: (
      <RenderPlanner
        rootChapter={DefaultTemplateRootChapter}
        rootContext={{
          startDate,
          endDate,
          pageWidth,
          pageHeight,
        }}
      />
    ),
  })

  return (
    <div className="h-screen w-screen bg-linear-to-r from-cyan-100 to-blue-100 grid place-items-center">
      <div className="overflow-hidden shadow-xs rounded-xl p-4 bg-white">
        <ClientOnly>
          <PDFViewer
            pdf={pdf}
            width={pageWidth / 3}
            height={pageHeight / 3}
          />
        </ClientOnly>
      </div>
    </div>
  )
}

const setupPDFViewer = createIsomorphicFn()
  .server(() => {})
  .client(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
  })

import { createFileRoute } from "@tanstack/react-router"
import { createIsomorphicFn } from "@tanstack/react-start"
import { pdfjs } from "react-pdf"
import { zodValidator } from "@tanstack/zod-adapter"
import { z } from "zod"
import { Trees } from "@/features/trees/trees"
import { PDFEditorView } from "@/features/pdf-editor/pdf-editor-view"

const searchSchema = z.object({
  treeId: z.string().optional().catch(undefined),
})

export const Route = createFileRoute("/")({
  ssr: false,
  validateSearch: zodValidator(searchSchema),
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ deps }) => {
    setupPDFViewer()

    let treeId: string | undefined

    if (deps.search.treeId) {
      const tree = Trees.getTree(deps.search.treeId)
      treeId = tree?.id
    }

    const newTree = Trees.createDefaultTree()
    treeId ??= newTree.id

    return { treeId }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { treeId } = Route.useLoaderData()

  return <PDFEditorView treeId={treeId} />
}

const setupPDFViewer = createIsomorphicFn()
  .server(() => {})
  .client(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
  })

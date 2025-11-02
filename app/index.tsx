import { ClientOnly, createFileRoute } from "@tanstack/react-router"
import { PDFViewer } from "@/features/pdf-viewer/pdf-viewer"
import { createIsomorphicFn } from "@tanstack/react-start"
import { pdfjs } from "react-pdf"
import { useState } from "react"
import { OutlineRenderer } from "@/features/outline-renderer/outline-renderer"
import { TreeNode } from "@/features/tree/tree"
import { Inspector } from "@/features/inspector/inspector"
import { zodValidator } from "@tanstack/zod-adapter"
import { z } from "zod"
import { TreeStore } from "@/features/tree-store/tree-store"

const pageWidth = 1620
const pageHeight = 2160

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
      const tree = TreeStore.getTree(deps.search.treeId)
      treeId = tree?.id
    }

    treeId ??= TreeStore.createDefaultTree()

    return { treeId }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { treeId } = Route.useLoaderData()
  const tree = TreeStore.getTree(treeId)

  const [selectedNode, setSelectedNode] = useState<TreeNode>(tree)

  return (
    <div className="h-screen w-screen bg-linear-to-r from-cyan-100 to-blue-100 grid place-items-center">
      <div className="flex flex-row gap-4 justify-center items-stretch max-w-[80vw] w-full max-h-[80vh]">
        <div className="shadow-xs rounded-xl p-4 pt-3.5 bg-white flex-1 overflow-y-auto">
          <OutlineRenderer
            nodes={[tree]}
            parent={null}
            onNodeSelect={setSelectedNode}
          />
        </div>

        <div className="shadow-xs rounded-xl p-4 pt-3 bg-white flex-1 flex flex-col">
          <p className="text-muted-foreground font-medium">
            Preview
          </p>

          <div className="flex-1 grid place-items-center">
            <ClientOnly>
              <PDFViewer
                key={JSON.stringify(tree)}
                tree={tree}
                width={pageWidth / 3}
                height={pageHeight / 3}
              />
            </ClientOnly>
          </div>
        </div>

        <div className="shadow-xs rounded-xl p-4 pt-3 bg-white flex-1 overflow-y-auto">
          <Inspector
            treeId={treeId}
            nodeId={selectedNode?.id ?? null}
          />
        </div>
      </div>
    </div>
  )
}

const setupPDFViewer = createIsomorphicFn()
  .server(() => {})
  .client(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
  })

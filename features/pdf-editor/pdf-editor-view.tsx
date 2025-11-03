import { ClientOnly } from "@tanstack/react-router"
import { PDFViewer } from "@/features/pdf-viewer/pdf-viewer"
import { Inspector } from "@/features/pdf-editor/inspector/inspector"
import { Trees } from "@/features/trees/trees"
import { Outline } from "@/features/pdf-editor/outline/outline"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor"

const pageWidth = 1620
const pageHeight = 2160

export type PDFEditorViewProps = {
  treeId: string
}

export function PDFEditorView({ treeId }: PDFEditorViewProps) {
  const tree = Trees.useTree(treeId)
  PDFEditor.set({ currentTreeId: treeId })

  return (
    <div className="h-screen w-screen bg-linear-to-r from-cyan-100 to-blue-100 grid place-items-center">
      <div className="flex flex-row gap-4 justify-center items-stretch max-w-[80vw] w-full max-h-[80vh]">
        <div className="shadow-xs rounded-xl p-4 pt-3.5 bg-white flex-1 overflow-y-auto">
          <Outline />
        </div>

        <div className="shadow-xs rounded-xl p-4 pt-3 bg-white flex-1 flex flex-col">
          <p className="text-muted-foreground font-medium">
            Preview
          </p>

          <div className="flex-1 grid place-items-center">
            <ClientOnly>
              <PDFViewer
                key={JSON.stringify(tree)}
                treeId={treeId}
                width={pageWidth / 3}
                height={pageHeight / 3}
              />
            </ClientOnly>
          </div>
        </div>

        <div className="shadow-xs rounded-xl p-4 pt-3 bg-white flex-1 overflow-y-auto">
          <Inspector />
        </div>
      </div>
    </div>
  )
}

import { Inspector } from "@/features/pdf-editor/inspector/inspector"
import { Outline } from "@/features/pdf-editor/outline/outline"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { PDFViewerHTML } from "@/features/pdf-viewer/pdf-viewer-html"

export type PDFEditorViewProps = {
  treeId: string
}

export function PDFEditorView({ treeId }: PDFEditorViewProps) {
  PDFEditor.set({ currentTreeId: treeId })

  return (
    <div
      className={`
        h-screen w-screen bg-linear-to-r from-sky-100 to-blue-100
        dark:from-zinc-500/15 dark:to-zinc-500/10
        overflow-hidden flex flex-row items-stretch p-2 gap-2
      `}
    >
      <div
        className={`
          shadow-xs rounded-xl p-4 pt-3.5 bg-background overflow-y-auto
          dark:border dark:shadow-2xl
          w-1/5
        `}
      >
        <Outline />
      </div>

      <div
        className={`
          shadow-xs rounded-xl p-4 pt-3.5 bg-background overflow-y-auto
          dark:border dark:shadow-2xl
          flex-1
        `}
      >
        <PDFViewerHTML
          treeId={treeId}
        />
      </div>

      <div
        className={`
          shadow-xs rounded-xl p-4 pt-3 bg-background overflow-y-auto
          dark:border dark:shadow-2xl
          w-1/5
        `}
      >
        <Inspector />
      </div>
    </div>
  )
}

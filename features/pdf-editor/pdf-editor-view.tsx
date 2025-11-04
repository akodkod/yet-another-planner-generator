import { ClientOnly } from "@tanstack/react-router"
import { Inspector } from "@/features/pdf-editor/inspector/inspector"
import { Outline } from "@/features/pdf-editor/outline/outline"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { PDFViewerHTML } from "@/features/pdf-viewer/pdf-viewer-html"
import { useMeasure } from "@/lib/hooks/use-measure"
import { motion } from "motion/react"

export type PDFEditorViewProps = {
  treeId: string
}

export function PDFEditorView({ treeId }: PDFEditorViewProps) {
  PDFEditor.set({ currentTreeId: treeId })

  const { ref, width, height } = useMeasure()

  return (
    <div
      className={`
        h-screen w-screen bg-linear-to-r from-cyan-100 to-blue-100 grid place-items-center
        dark:from-zinc-500/15 dark:to-zinc-500/10
      `}
    >
      <div className="grid grid-cols-4 gap-4 auto-rows-fr max-w-[80vw] w-full max-h-[80vh]">
        <div
          className={`
            shadow-xs rounded-xl p-4 pt-3.5 bg-background overflow-y-auto
            dark:border dark:shadow-2xl
          `}
        >
          <Outline />
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
          className="col-span-2"
        >
          <ClientOnly>
            <PDFViewerHTML
              treeId={treeId}
              availableWidth={width}
              availableHeight={height}
            />
          </ClientOnly>
        </motion.div>

        <div
          className={`
            shadow-xs rounded-xl p-4 pt-3 bg-background overflow-y-auto
            dark:border dark:shadow-2xl
          `}
        >
          <Inspector />
        </div>
      </div>
    </div>
  )
}

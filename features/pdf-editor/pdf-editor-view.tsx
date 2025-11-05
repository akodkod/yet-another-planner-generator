import { Inspector } from "@/features/pdf-editor/inspector/inspector"
import { Outline } from "@/features/pdf-editor/outline/outline"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { PDFViewer } from "@/features/pdf-viewer/pdf-viewer"
import { PDFViewerHTML } from "@/features/pdf-viewer/pdf-viewer-html"
import { TreeNodeType } from "@/features/trees/tree"
import { Tabs, TabsList, TabsTrigger } from "@/lib/ui/tabs"
import { useState } from "react"

export type PDFEditorViewProps = {
  treeId: string
}

export function PDFEditorView({ treeId }: PDFEditorViewProps) {
  PDFEditor.set({ currentTreeId: treeId })

  const selectedNode = PDFEditor.useOptionalSelectedNode()
  const parentPageNode = PDFEditor.useParentNodeOfType(selectedNode?.id ?? null, TreeNodeType.Page)

  const page = selectedNode?.type === TreeNodeType.Page ? selectedNode : parentPageNode
  const pageIdsToRender = page ? [page.id] : undefined

  const [tab, setTab] = useState("editor")

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
          shadow-xs rounded-xl p-4 pt-3.5 bg-background overflow-hidden
          dark:border dark:shadow-2xl
          flex-1
        `}
      >
        <Tabs
          value={tab}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-100"
          onValueChange={setTab}
        >
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </Tabs>

        {tab === "editor" && (
          <PDFViewerHTML
            treeId={treeId}
            pageIdsToRender={pageIdsToRender}
          />
        )}

        {tab === "preview" && (
          <PDFViewer
            key={pageIdsToRender?.join(",") ?? "none"}
            treeId={treeId}
            pageIdsToRender={pageIdsToRender}
          />
        )}
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

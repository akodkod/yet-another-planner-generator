import { PDFEditor } from "@/features/pdf-editor/pdf-editor"
import { PDFRenderer } from "@/features/pdf-renderer/pdf-renderer"
import { PDFViewerPagination } from "@/features/pdf-viewer/pdf-viewer-pagination"
import { TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees"
import { motion } from "motion/react"
import { CSSProperties, useCallback, useMemo, useState } from "react"

export type PDFViewerPropsHTML = {
  treeId: string
  availableWidth: number
  availableHeight: number
}

export function PDFViewerHTML({ treeId, availableWidth, availableHeight }: PDFViewerPropsHTML) {
  const rootNode = Trees.useNodeOf(treeId, treeId, TreeNodeType.RootChapter)
  const selectedNodeId = PDFEditor.useOptionalSelectedNodeId()
  const parentPageNode = PDFEditor.useParentNodeOfType(selectedNodeId, TreeNodeType.PageChapter)

  const { pageWidth, pageHeight } = rootNode.chapter

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1024)

  const aspectRatio = pageWidth / pageHeight
  const isHeightLimited = availableHeight < pageHeight
  const scale = isHeightLimited ? availableHeight / pageHeight : availableWidth / pageWidth

  const viewWidth = isHeightLimited ? availableWidth : availableWidth / aspectRatio
  const viewHeight = isHeightLimited ? availableHeight : availableHeight * aspectRatio

  const pageWidthScaled = pageWidth * scale
  const pageHeightScaled = pageHeight * scale

  const handleNodeClick = useCallback((nodeId: string) => {
    PDFEditor.selectNode(nodeId)
  }, [])

  const pdf = useMemo(() => (
    <PDFRenderer
      html
      treeId={treeId}
      selectedNodeId={selectedNodeId}
      pageIdsToRender={parentPageNode ? [parentPageNode.id] : undefined}
      onNodeClick={handleNodeClick}
    />
  ), [treeId, selectedNodeId])

  return (
    <motion.div
      transition={{ duration: 0.2 }}
      animate={{ width: viewWidth, height: viewHeight }}
      className="grid place-items-center"
    >
      <motion.div
        transition={{ duration: 0.2 }}
        animate={{ width: pageWidthScaled, height: pageHeightScaled }}
        className="overflow-hidden bg-white shadow-xs rounded-xl relative"
      >
        <motion.div
          transition={{ duration: 0.2 }}
          animate={{ width: pageWidth, height: pageHeight, scale }}
          style={{
            "--scroller-position": `-${(currentPage - 1) * pageWidth}px`,
          } as CSSProperties}
          className="origin-top-left text-black"
        >
          {pdf}
        </motion.div>

        <PDFViewerPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() => setCurrentPage(currentPage - 1)}
          onNext={() => setCurrentPage(currentPage + 1)}
        />
      </motion.div>
    </motion.div>
  )
}

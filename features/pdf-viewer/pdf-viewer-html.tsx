import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { PDFRenderer, PDFRendererProps } from "@/features/pdf-renderer/pdf-renderer"
import { TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees.module"
import { useMeasure } from "@/lib/hooks/use-measure"
import { motion } from "motion/react"

export type PDFViewerPropsHTML = Pick<PDFRendererProps, "pageIdsToRender"> & {
  treeId: string
  pageIdsToRender?: string[]
}

// TODO: Add pagination?
export function PDFViewerHTML({ treeId, pageIdsToRender }: PDFViewerPropsHTML) {
  const rootNode = Trees.useNodeOf(treeId, treeId, TreeNodeType.Root)

  const { ref, width: availableWidth, height: availableHeight } = useMeasure()

  // const [currentPage, setCurrentPage] = useState(1)
  // const [totalPages, setTotalPages] = useState(1024)

  const hasSize = availableWidth > 0 && availableHeight > 0

  const { pageWidth, pageHeight } = rootNode.data
  const isHeightLimited = availableHeight < pageHeight
  const scale = isHeightLimited ? availableHeight / pageHeight : availableWidth / pageWidth

  const pdfWidthScaled = pageWidth * scale
  const pdfHeightScaled = pageHeight * scale

  const handleNodeClick = (nodeId: string) => {
    PDFEditor.selectNode(nodeId)
  }

  return (
    <div
      ref={ref}
      className="size-full grid place-items-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasSize ? 1 : 0, width: pdfWidthScaled, height: pdfHeightScaled }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="overflow-hidden relative border-1 rounded-sm shadow-xs"
      >
        <motion.div
          transition={{ duration: 0.2, ease: "easeOut" }}
          animate={{
            width: pageWidth,
            height: pageHeight,
            scale,
            translateX: `-${(pageWidth - pdfWidthScaled) / 2}px`,
            translateY: `-${(pageHeight - pdfHeightScaled) / 2}px`,
          }}
          // style={{ "--scroller-position": `-${(currentPage - 1) * pageWidth}px` } as CSSProperties}
          className="text-black bg-white"
        >
          <PDFRenderer
            html
            treeId={treeId}
            pageIdsToRender={pageIdsToRender}
            onNodeClick={handleNodeClick}
          />
        </motion.div>

        {/* <PDFViewerPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() => setCurrentPage(currentPage - 1)}
          onNext={() => setCurrentPage(currentPage + 1)}
        /> */}
      </motion.div>
    </div>
  )
}

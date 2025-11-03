import { RootChapterContext } from "@/features/chapters/chapter-contexts"
import { PDFRenderChildren } from "@/features/pdf-renderer/pdf-render-children"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees"
import { TZDate } from "@date-fns/tz"
import { Document } from "@react-pdf/renderer"
import { useMemo } from "react"

export function PDFRootChapter({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId } = usePDFRenderer()
  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.RootChapter)

  const startDate = new TZDate(node.chapter.year, 0, 1)
  const endDate = new TZDate(node.chapter.year, 11, 31)

  const value: RootChapterContext = useMemo(() => ({
    startDate,
    endDate,
    pageWidth: node.chapter.pageWidth,
    pageHeight: node.chapter.pageHeight,
  }), [node.chapter.pageWidth, node.chapter.pageHeight, startDate, endDate])

  return (
    <RootChapterContext.Provider value={value}>
      <Document pageMode="fullScreen">
        <PDFRenderChildren nodeId={node.id} />
      </Document>
    </RootChapterContext.Provider>
  )
}

import { RootChapterContext } from "@/features/chapters/chapter-contexts"
import { PDFNodeRendererProps, PDFRenderer } from "@/features/pdf-renderer/pdf-renderer"
import { RootChapterTreeNode } from "@/features/tree/tree"
import { TZDate } from "@date-fns/tz"
import { Document } from "@react-pdf/renderer"
import { useMemo } from "react"

export function PDFRootChapter({ node }: PDFNodeRendererProps<RootChapterTreeNode>) {
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
        <PDFRenderer
          nodes={node.children}
          parent={node}
        />
      </Document>
    </RootChapterContext.Provider>
  )
}

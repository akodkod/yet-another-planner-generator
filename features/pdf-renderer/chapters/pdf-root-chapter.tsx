import { RootChapterContext } from "@/features/chapters/chapter-contexts"
import { PDFRenderChildren } from "@/features/pdf-renderer/pdf-render-children"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { RootChapterTreeNode, TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees.module"
import { TZDate } from "@date-fns/tz"
import { Document } from "@react-pdf/renderer"
import { ReactNode } from "react"

export function PDFRootChapter({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId, html } = usePDFRenderer()
  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.RootChapter)

  const startDate = new TZDate(node.chapter.year, 0, 1)
  const endDate = new TZDate(node.chapter.year, 11, 31)

  const value: RootChapterContext = {
    startDate,
    endDate,
    pageWidth: node.chapter.pageWidth,
    pageHeight: node.chapter.pageHeight,
  }

  const Content = html
    ? ContentHTML
    : ContentPDF

  return (
    <RootChapterContext.Provider value={value}>
      <Content node={node}>
        <PDFRenderChildren nodeId={node.id} />
      </Content>
    </RootChapterContext.Provider>
  )
}

type ContentProps = {
  node: RootChapterTreeNode
  children: ReactNode
}

function ContentPDF({ children }: ContentProps) {
  return (
    <Document pageMode="fullScreen">
      {children}
    </Document>
  )
}

function ContentHTML({ node, children }: ContentProps) {
  return (
    <div
      style={{
        width: node.chapter.pageWidth,
        height: node.chapter.pageHeight,
      }}
      className="overflow-hidden relative"
    >
      <div
        data-slot="pdf-scroller"
        style={{ height: node.chapter.pageHeight }}
        className={`
          flex flex-row items-center absolute top-0 left-0 transition-transform duration-200 ease-out
          translate-x-(--scroller-position)
        `}
      >
        {children}
      </div>
    </div>
  )
}

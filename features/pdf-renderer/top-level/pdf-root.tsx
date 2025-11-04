import { RootContext } from "@/features/pdf-renderer/pdf-renderer-contexts"
import { PDFRenderChildren } from "@/features/pdf-renderer/pdf-render-children"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { RootNode, TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees.module"
import { TZDate } from "@date-fns/tz"
import { Document } from "@react-pdf/renderer"
import { ReactNode } from "react"

export function PDFRoot({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId, html } = usePDFRenderer()
  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.Root)

  const startDate = new TZDate(node.data.year, 0, 1)
  const endDate = new TZDate(node.data.year, 11, 31)

  const value: RootContext = {
    startDate,
    endDate,
    pageWidth: node.data.pageWidth,
    pageHeight: node.data.pageHeight,
  }

  const Content = html
    ? ContentHTML
    : ContentPDF

  return (
    <RootContext.Provider value={value}>
      <Content node={node}>
        <PDFRenderChildren nodeId={node.id} />
      </Content>
    </RootContext.Provider>
  )
}

type ContentProps = {
  node: RootNode
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
        width: node.data.pageWidth,
        height: node.data.pageHeight,
      }}
      className="overflow-hidden relative"
    >
      <div
        data-slot="pdf-scroller"
        style={{ height: node.data.pageHeight }}
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

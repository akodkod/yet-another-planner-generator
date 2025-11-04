import { PageContext, useRootContext } from "@/features/pdf-renderer/pdf-renderer-contexts"
import { PDFRenderChildren } from "@/features/pdf-renderer/pdf-render-children"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { PageNode, TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees.module"
import { Page } from "@react-pdf/renderer"
import { ReactNode } from "react"
import { pdfStyleToHTML } from "@/features/pdf-renderer/blocks/pdf-base-block"

export function PDFPage({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId, html, pageIdsToRender } = usePDFRenderer()
  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.Page)

  const { pageWidth, pageHeight } = useRootContext()

  if (pageIdsToRender && !pageIdsToRender.includes(node.id)) {
    return null
  }

  const Content = html ? ContentHTML : ContentPDF

  return (
    <PageContext.Provider value={{}}>
      <Content
        node={node}
        pageWidth={pageWidth}
        pageHeight={pageHeight}
      >
        <PDFRenderChildren nodeId={node.id} />
      </Content>
    </PageContext.Provider>
  )
}

type ContentProps = {
  node: PageNode
  pageWidth: number
  pageHeight: number
  children: ReactNode
}

function ContentPDF({ node, pageWidth, pageHeight, children }: ContentProps) {
  return (
    <Page
      size={{
        width: pageWidth,
        height: pageHeight,
      }}
      style={node.data.style}
    >
      {children}
    </Page>
  )
}

function ContentHTML({ node, pageWidth, pageHeight, children }: ContentProps) {
  return (
    <div
      style={{
        ...pdfStyleToHTML(node.data.style),
        width: pageWidth,
        height: pageHeight,
      }}
    >
      {children}
    </div>
  )
}

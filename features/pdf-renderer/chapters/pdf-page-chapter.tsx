import { PageChapterContext, useRootChapterContext } from "@/features/chapters/chapter-contexts"
import { PDFRenderChildren } from "@/features/pdf-renderer/pdf-render-children"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees.module"
import { Page } from "@react-pdf/renderer"
import { ReactNode } from "react"

export function PDFPageChapter({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId, html, pageIdsToRender } = usePDFRenderer()
  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.PageChapter)

  const { pageWidth, pageHeight } = useRootChapterContext()

  if (pageIdsToRender && !pageIdsToRender.includes(node.id)) {
    return null
  }

  const Content = html ? ContentHTML : ContentPDF

  return (
    <PageChapterContext.Provider value={{}}>
      <Content
        pageWidth={pageWidth}
        pageHeight={pageHeight}
      >
        <PDFRenderChildren nodeId={node.id} />
      </Content>
    </PageChapterContext.Provider>
  )
}

type ContentProps = {
  pageWidth: number
  pageHeight: number
  children: ReactNode
}

function ContentPDF({ pageWidth, pageHeight, children }: ContentProps) {
  return (
    <Page
      size={{
        width: pageWidth,
        height: pageHeight,
      }}
    >
      {children}
    </Page>
  )
}

function ContentHTML({ pageWidth, pageHeight, children }: ContentProps) {
  return (
    <div
      style={{
        width: pageWidth,
        height: pageHeight,
      }}
    >
      {children}
    </div>
  )
}

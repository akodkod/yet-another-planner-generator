import { PageChapterContext, useRootChapterContext } from "@/features/chapters/chapter-contexts"
import { PDFRenderChildren } from "@/features/pdf-renderer/pdf-render-children"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees"
import { Page } from "@react-pdf/renderer"

export function PDFPageChapter({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId } = usePDFRenderer()
  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.PageChapter)

  const { pageWidth, pageHeight } = useRootChapterContext()

  return (
    <PageChapterContext.Provider value={{}}>
      <Page
        size={{
          width: pageWidth,
          height: pageHeight,
        }}
      >
        <PDFRenderChildren nodeId={node.id} />
      </Page>
    </PageChapterContext.Provider>
  )
}

import { PageChapterContext, useRootChapterContext } from "@/features/chapters/chapter-contexts"
import { PDFNodeRendererProps, PDFRenderer } from "@/features/pdf-renderer/pdf-renderer"
import { PageChapterTreeNode } from "@/features/tree/tree"
import { Page } from "@react-pdf/renderer"

export function PDFPageChapter({ node }: PDFNodeRendererProps<PageChapterTreeNode>) {
  const { pageWidth, pageHeight } = useRootChapterContext()

  return (
    <PageChapterContext.Provider value={{}}>
      <Page
        size={{
          width: pageWidth,
          height: pageHeight,
        }}
      >
        <PDFRenderer
          nodes={node.children}
          parent={node}
        />
      </Page>
    </PageChapterContext.Provider>
  )
}

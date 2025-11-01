import { BlocksRenderer } from "@/features/blocks/blocks-renderer"
import { PageChapterContext, useRootChapterContext } from "@/features/chapters/chapter-contexts"
import { PageChapter } from "@/features/chapters/chapter-types"
import { ChapterRendererProps } from "@/features/chapters/chapters-renderer"
import { Page } from "@react-pdf/renderer"

export function PageChapterRenderer({ chapter, parent: _ }: ChapterRendererProps<PageChapter>) {
  const { pageWidth, pageHeight } = useRootChapterContext()

  return (
    <PageChapterContext.Provider value={{}}>
      <Page
        size={{
          width: pageWidth,
          height: pageHeight,
        }}
      >
        <BlocksRenderer
          blocks={[chapter.template]}
          parent={null}
        />
      </Page>
    </PageChapterContext.Provider>
  )
}

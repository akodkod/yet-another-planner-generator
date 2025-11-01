import { RootChapterContext } from "@/features/chapters/chapter-contexts"
import { Chapter, RootChapter } from "@/features/chapters/chapter-types"
import { RootChapterRenderer } from "@/features/chapters/renderers/root-chapter-renderer"

import "@/features/pdf/pdf-initializer"

export type ChapterRendererProps<T extends Chapter = Chapter> = {
  chapter: T
  parent: Chapter | null
}

export type RenderPlannerProps = {
  rootChapter: RootChapter
  rootContext: RootChapterContext
}

export function RenderPlanner({ rootChapter, rootContext }: RenderPlannerProps) {
  return (
    <RootChapterRenderer
      chapter={rootChapter}
      context={rootContext}
    />
  )
}

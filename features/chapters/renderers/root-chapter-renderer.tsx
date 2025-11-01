import { RootChapterContext } from "@/features/chapters/chapter-contexts"
import { ChapterType, RootChapter } from "@/features/chapters/chapter-types"
import { PageChapterRenderer } from "@/features/chapters/renderers/page-chapter-renderer"
import { YearChapterRenderer } from "@/features/chapters/renderers/year-chapter-renderer"
import { Document } from "@react-pdf/renderer"
import { Fragment } from "react/jsx-runtime"
import { match } from "ts-pattern"

export type RootChapterRendererProps = {
  chapter: RootChapter
  context: RootChapterContext
}

export function RootChapterRenderer({ chapter, context }: RootChapterRendererProps) {
  return (
    <RootChapterContext.Provider value={context}>
      <Document pageMode="fullScreen">
        {chapter.children.map((child) => (
          <Fragment key={child.id}>
            {match(child)
              .with({ type: ChapterType.Year }, (child) => (
                <YearChapterRenderer
                  chapter={child}
                  parent={chapter}
                />
              ))
              .with({ type: ChapterType.Page }, (child) => (
                <PageChapterRenderer
                  chapter={child}
                  parent={chapter}
                />
              ))
              .exhaustive()}
          </Fragment>
        ))}
      </Document>
    </RootChapterContext.Provider>
  )
}

import { useRootChapterContext, YearChapterContext } from "@/features/chapters/chapter-contexts"
import { PDFNodeRendererProps, PDFRenderer } from "@/features/pdf-renderer/pdf-renderer"
import { YearChapterTreeNode } from "@/features/tree/tree"
import { tz } from "@date-fns/tz"
import { eachYearOfInterval, endOfYear, getYear, startOfYear } from "date-fns"

export function PDFYearChapter({ node }: PDFNodeRendererProps<YearChapterTreeNode>) {
  const { startDate, endDate } = useRootChapterContext()

  const years = eachYearOfInterval({
    start: startDate,
    end: endDate,
  }, {
    in: tz("UTC"),
  })

  return years.map((year) => (
    <YearChapterContext.Provider
      key={year.toString()}
      value={{
        year: getYear(year),
        yearDate: year,
        yearStartDate: startOfYear(year),
        yearEndDate: endOfYear(year),
      }}
    >
      <PDFRenderer
        nodes={node.children}
        parent={node}
      />
    </YearChapterContext.Provider>
  ))
}

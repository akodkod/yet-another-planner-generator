import { MonthChapterContext, useRootChapterContext, useYearChapterContext } from "@/features/chapters/chapter-contexts"
import { PDFNodeRendererProps, PDFRenderer } from "@/features/pdf-renderer/pdf-renderer"
import { MonthChapterTreeNode } from "@/features/tree/tree"
import { tz, TZDate } from "@date-fns/tz"
import { eachMonthOfInterval, endOfMonth, endOfYear, getMonth, max, min, startOfMonth, startOfYear } from "date-fns"

export function PDFMonthChapter({ node }: PDFNodeRendererProps<MonthChapterTreeNode>) {
  const { startDate, endDate } = useRootChapterContext()
  const { yearDate } = useYearChapterContext()

  const yearStartDate = max([startOfYear(yearDate), startDate] satisfies TZDate[])
  const yearEndDate = min([endOfYear(yearDate), endDate] satisfies TZDate[])

  const months = eachMonthOfInterval({
    start: yearStartDate,
    end: yearEndDate,
  }, {
    in: tz("UTC"),
  })

  return months.map((month) => (
    <MonthChapterContext.Provider
      key={month.toString()}
      value={{
        monthDate: month,
        monthOfYear: getMonth(month) + 1,
        monthStartDate: startOfMonth(month),
        monthEndDate: endOfMonth(month),
      }}
    >
      <PDFRenderer
        nodes={node.children}
        parent={node}
      />
    </MonthChapterContext.Provider>
  ))
}

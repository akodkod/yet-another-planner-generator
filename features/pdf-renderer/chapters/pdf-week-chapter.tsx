import { useMonthChapterContext, useRootChapterContext, WeekChapterContext } from "@/features/chapters/chapter-contexts"
import { PDFNodeRendererProps, PDFRenderer } from "@/features/pdf-renderer/pdf-renderer"
import { WeekChapterTreeNode } from "@/features/tree/tree"
import { tz } from "@date-fns/tz"
import { clamp, eachWeekOfInterval, endOfWeek, getWeek, getWeekOfMonth, startOfWeek } from "date-fns"

export function PDFWeekChapter({ node }: PDFNodeRendererProps<WeekChapterTreeNode>) {
  const { startDate, endDate } = useRootChapterContext()
  const { monthStartDate, monthEndDate } = useMonthChapterContext()

  const weeks = eachWeekOfInterval({
    start: monthStartDate,
    end: monthEndDate,
  }, {
    weekStartsOn: 1,
    in: tz("UTC"),
  }).map((week) => clamp(week, { start: startDate, end: endDate }))

  return weeks.map((week) => (
    <WeekChapterContext.Provider
      key={week.toString()}
      value={{
        weekOfYear: getWeek(week, { weekStartsOn: 1 }),
        weekOfMonth: getWeekOfMonth(week, { weekStartsOn: 1 }),
        weekStartDate: startOfWeek(week, { weekStartsOn: 1 }),
        weekEndDate: endOfWeek(week, { weekStartsOn: 1 }),
      }}
    >
      <PDFRenderer
        nodes={node.children}
        parent={node}
      />
    </WeekChapterContext.Provider>
  ))
}

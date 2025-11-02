import { DayChapterContext, useRootChapterContext, useWeekChapterContext } from "@/features/chapters/chapter-contexts"
import { PDFNodeRendererProps, PDFRenderer } from "@/features/pdf-renderer/pdf-renderer"
import { DayChapterTreeNode } from "@/features/tree/tree"
import { tz } from "@date-fns/tz"
import { eachDayOfInterval, getDate, getDay, getDayOfYear, max, min } from "date-fns"

export function PDFDayChapter({ node }: PDFNodeRendererProps<DayChapterTreeNode>) {
  const { startDate, endDate } = useRootChapterContext()
  const { weekStartDate, weekEndDate } = useWeekChapterContext()

  const daysStartDate = max([weekStartDate, startDate])
  const daysEndDate = min([weekEndDate, endDate])
  const days = eachDayOfInterval({
    start: daysStartDate,
    end: daysEndDate,
  }, {
    in: tz("UTC"),
  })

  return days.map((day) => (
    <DayChapterContext.Provider
      key={day.toString()}
      value={{
        dayDate: day,
        dayOfYear: getDayOfYear(day),
        dayOfMonth: getDate(day),
        dayOfWeek: getDay(day),
      }}
    >
      <PDFRenderer
        nodes={node.children}
        parent={node}
      />
    </DayChapterContext.Provider>
  ))
}

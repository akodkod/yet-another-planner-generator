import { DayChapterContext, useRootChapterContext, useWeekChapterContext } from "@/features/chapters/chapter-contexts"
import { DayChapter } from "@/features/chapters/chapter-types"
import { ChapterRendererProps } from "@/features/chapters/chapters-renderer"
import { PageChapterRenderer } from "@/features/chapters/renderers/page-chapter-renderer"
import { tz } from "@date-fns/tz"
import { eachDayOfInterval, getDate, getDay, getDayOfYear, max, min } from "date-fns"

export function DayChapterRenderer({ chapter, parent: _ }: ChapterRendererProps<DayChapter>) {
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
      {chapter.children.map((child) => (
        <PageChapterRenderer
          key={child.id}
          chapter={child}
          parent={chapter}
        />
      ))}
    </DayChapterContext.Provider>
  ))
}

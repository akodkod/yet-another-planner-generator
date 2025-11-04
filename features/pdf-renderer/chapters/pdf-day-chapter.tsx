import { DayChapterContext, useRootChapterContext, useWeekChapterContext } from "@/features/chapters/chapter-contexts"
import { PDFRenderChildren } from "@/features/pdf-renderer/pdf-render-children"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees.module"
import { tz } from "@date-fns/tz"
import { eachDayOfInterval, getDate, getDay, getDayOfYear, max, min } from "date-fns"

export function PDFDayChapter({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId } = usePDFRenderer()
  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.DayChapter)

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
      <PDFRenderChildren nodeId={node.id} />
    </DayChapterContext.Provider>
  ))
}

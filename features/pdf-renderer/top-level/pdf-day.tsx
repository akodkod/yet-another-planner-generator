import { DayContext, useRootContext, useWeekContext } from "@/features/pdf-renderer/pdf-renderer-contexts"
import { PDFRenderChildren } from "@/features/pdf-renderer/pdf-render-children"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees.module"
import { tz } from "@date-fns/tz"
import { eachDayOfInterval, getDate, getDay, getDayOfYear, max, min } from "date-fns"

export function PDFDay({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId } = usePDFRenderer()
  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.Day)

  const { startDate, endDate } = useRootContext()
  const { weekStartDate, weekEndDate } = useWeekContext()

  const days = eachDayOfInterval({
    start: max([weekStartDate, startDate]),
    end: min([weekEndDate, endDate]),
  }, {
    in: tz("UTC"),
  })

  return days.map((day) => (
    <DayContext.Provider
      key={day.toString()}
      value={{
        dayDate: day,
        dayOfYear: getDayOfYear(day),
        dayOfMonth: getDate(day),
        dayOfWeek: getDay(day),
      }}
    >
      <PDFRenderChildren nodeId={node.id} />
    </DayContext.Provider>
  ))
}

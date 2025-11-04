import { useMonthContext, useRootContext, WeekContext } from "@/features/pdf-renderer/pdf-renderer-contexts"
import { PDFRenderChildren } from "@/features/pdf-renderer/pdf-render-children"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees.module"
import { tz } from "@date-fns/tz"
import { clamp, eachWeekOfInterval, endOfWeek, getWeek, getWeekOfMonth, startOfWeek } from "date-fns"

export function PDFWeek({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId } = usePDFRenderer()
  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.Week)

  const { startDate, endDate } = useRootContext()
  const { monthStartDate, monthEndDate } = useMonthContext()

  const weeks = eachWeekOfInterval({
    start: monthStartDate,
    end: monthEndDate,
  }, {
    weekStartsOn: 1,
    in: tz("UTC"),
  }).map((week) => clamp(week, { start: startDate, end: endDate }))

  return weeks.map((week) => (
    <WeekContext.Provider
      key={week.toString()}
      value={{
        weekOfYear: getWeek(week, { weekStartsOn: 1 }),
        weekOfMonth: getWeekOfMonth(week, { weekStartsOn: 1 }),
        weekStartDate: startOfWeek(week, { weekStartsOn: 1 }),
        weekEndDate: endOfWeek(week, { weekStartsOn: 1 }),
      }}
    >
      <PDFRenderChildren nodeId={node.id} />
    </WeekContext.Provider>
  ))
}

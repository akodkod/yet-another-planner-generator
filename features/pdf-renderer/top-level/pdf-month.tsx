import { MonthContext, useRootContext, useYearContext } from "@/features/pdf-renderer/pdf-renderer-contexts"
import { PDFRenderChildren } from "@/features/pdf-renderer/pdf-render-children"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees.module"
import { tz, TZDate } from "@date-fns/tz"
import { eachMonthOfInterval, endOfMonth, endOfYear, getMonth, max, min, startOfMonth, startOfYear } from "date-fns"

export function PDFMonth({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId } = usePDFRenderer()
  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.Month)

  const { startDate, endDate } = useRootContext()
  const { yearDate } = useYearContext()

  const yearStartDate = max([startOfYear(yearDate), startDate] satisfies TZDate[])
  const yearEndDate = min([endOfYear(yearDate), endDate] satisfies TZDate[])

  const months = eachMonthOfInterval({
    start: yearStartDate,
    end: yearEndDate,
  }, {
    in: tz("UTC"),
  })

  return months.map((month) => (
    <MonthContext.Provider
      key={month.toString()}
      value={{
        monthDate: month,
        monthOfYear: getMonth(month) + 1,
        monthStartDate: startOfMonth(month),
        monthEndDate: endOfMonth(month),
      }}
    >
      <PDFRenderChildren nodeId={node.id} />
    </MonthContext.Provider>
  ))
}

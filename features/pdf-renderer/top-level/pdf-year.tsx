import { useRootContext, YearContext } from "@/features/pdf-renderer/pdf-renderer-contexts"
import { PDFRenderChildren } from "@/features/pdf-renderer/pdf-render-children"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees.module"
import { tz } from "@date-fns/tz"
import { eachYearOfInterval, endOfYear, getYear, startOfYear } from "date-fns"

export function PDFYear({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId } = usePDFRenderer()
  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.Year)

  const { startDate, endDate } = useRootContext()

  const years = eachYearOfInterval({
    start: startDate,
    end: endDate,
  }, {
    in: tz("UTC"),
  })

  return years.map((year) => (
    <YearContext.Provider
      key={year.toString()}
      value={{
        year: getYear(year),
        yearDate: year,
        yearStartDate: startOfYear(year),
        yearEndDate: endOfYear(year),
      }}
    >
      <PDFRenderChildren nodeId={node.id} />
    </YearContext.Provider>
  ))
}

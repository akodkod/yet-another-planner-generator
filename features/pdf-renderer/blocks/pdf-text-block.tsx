import { getBaseBlockStyles } from "@/features/pdf-renderer/blocks/pdf-base-block"
import { useRootChapterContext, useOptionalYearChapterContext, useOptionalDayChapterContext, useOptionalMonthChapterContext, useOptionalPageChapterContext, useOptionalWeekChapterContext } from "@/features/chapters/chapter-contexts"
import { ViewStyle } from "@/lib/utils/react-pdf"
import Handlebars from "handlebars"
import { format } from "date-fns"
import { Text, View } from "@react-pdf/renderer"
import { localeCodeExists, localeCodeToLocale } from "@/lib/utils/date-fns"
import { getErrorMessage } from "@/lib/utils/error"
import { TreeNodeType } from "@/features/trees/tree"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { Trees } from "@/features/trees/trees"

export function PDFTextBlock({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId } = usePDFRenderer()

  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.TextBlock)
  const parent = Trees.useParentNode(treeId, nodeId)
  const variables = useVariables()

  const styles: ViewStyle = {
    ...getBaseBlockStyles(node, parent),
  }

  return (
    <View style={styles}>
      <Text style={node.block.textStyle}>
        {renderContent(node.block.content, variables)}
      </Text>
    </View>
  )
}

function useVariables() {
  const rootContext = useRootChapterContext()
  const yearContext = useOptionalYearChapterContext()
  const monthContext = useOptionalMonthChapterContext()
  const weekContext = useOptionalWeekChapterContext()
  const dayContext = useOptionalDayChapterContext()
  const pageContext = useOptionalPageChapterContext()

  return {
    ...rootContext,
    ...yearContext,
    ...monthContext,
    ...weekContext,
    ...dayContext,
    ...pageContext,
  }
}

function renderContent(text: string, variables: Record<string, unknown>) {
  if (!text.includes("{")) return text

  try {
    const template = Handlebars.compile(text)
    return template(variables)
  } catch (error) {
    return `Cannot render text: "${text}". Error: ${getErrorMessage(error)}`
  }
}

Handlebars.registerHelper("format-date", (date: unknown, dateFormat: string, localeCodeOrContext?: unknown) => {
  const localeCode = typeof localeCodeOrContext === "string" ? localeCodeOrContext : undefined

  if (date instanceof Date) {
    if (localeCode && !localeCodeExists(localeCode)) {
      return `Cannot format date. Locale "${localeCode}" does not exist`
    }

    try {
      return format(date, dateFormat, { locale: localeCodeToLocale(localeCode) })
    } catch (error) {
      return `Cannot format date: "${date}". Error: ${getErrorMessage(error)}`
    }
  } else {
    return `Cannot format date. "${date}" is not a date`
  }
})

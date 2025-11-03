import { getBaseBlockStyle } from "@/features/pdf-renderer/blocks/pdf-base-block"
import { useRootChapterContext, useOptionalYearChapterContext, useOptionalDayChapterContext, useOptionalMonthChapterContext, useOptionalPageChapterContext, useOptionalWeekChapterContext } from "@/features/chapters/chapter-contexts"
import { ViewStyle } from "@/lib/utils/react-pdf"
import Handlebars from "handlebars"
import { format } from "date-fns"
import { Text, View } from "@react-pdf/renderer"
import { localeCodeExists, localeCodeToLocale } from "@/lib/utils/date-fns"
import { getErrorMessage } from "@/lib/utils/error"
import { TextBlockTreeNode, TreeNodeType } from "@/features/trees/tree"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { Trees } from "@/features/trees/trees"
import { ReactNode } from "react"

export function PDFTextBlock({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId, html } = usePDFRenderer()

  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.TextBlock)
  const parent = Trees.useParentNode(treeId, nodeId)
  const variables = useVariables()

  const style: ViewStyle = {
    ...getBaseBlockStyle(node, parent),
  }

  const Content = html ? ContentHTML : ContentPDF

  return (
    <Content
      node={node}
      style={style}
    >
      {renderContent(node.block.content, variables)}
    </Content>
  )
}

type ContentProps = {
  node: TextBlockTreeNode
  style: ViewStyle
  children: ReactNode
}

function ContentPDF({ node, style, children }: ContentProps) {
  return (
    <View style={style}>
      <Text style={node.block.textStyle}>
        {children}
      </Text>
    </View>
  )
}

function ContentHTML({ node, style, children }: ContentProps) {
  const { onNodeClick } = usePDFRenderer()

  return (
    <div
      style={style}
      className="cursor-pointer"
      onClick={(event) => {
        event.stopPropagation()
        onNodeClick?.(node.id)
      }}
    >
      <span style={node.block.textStyle}>
        {children}
      </span>
    </div>
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

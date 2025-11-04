import { useRequireContext } from "@/lib/hooks/use-require-context"
import { createContext, ReactNode } from "react"

export type PDFRendererOptions = {
  html?: boolean
  pageIdsToRender?: string[]
  onNodeClick?: (nodeId: string) => void
}

export type PDFRendererContext = PDFRendererOptions & {
  treeId: string
}

const PDFRendererContext = createContext<PDFRendererContext | null>(null)
export const usePDFRenderer = () => useRequireContext(PDFRendererContext)

export type PDFRendererProviderProps = PDFRendererOptions & {
  treeId: string
  children: ReactNode
}

export function PDFRendererProvider({ treeId, children, ...options }: PDFRendererProviderProps) {
  const value = {
    treeId,
    ...options,
  }

  return (
    <PDFRendererContext.Provider value={value}>
      {children}
    </PDFRendererContext.Provider>
  )
}

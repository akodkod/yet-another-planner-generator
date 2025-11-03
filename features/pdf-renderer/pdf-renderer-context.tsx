import { useRequireContext } from "@/lib/hooks/use-require-context"
import { createContext, ReactNode, useMemo } from "react"

export type PDFRendererOptions = {
  onlyPageIds?: string[]
}

export type PDFRendererContext = {
  treeId: string
  options: PDFRendererOptions
}

const PDFRendererContext = createContext<PDFRendererContext | null>(null)
export const usePDFRenderer = () => useRequireContext(PDFRendererContext)

export type PDFRendererProviderProps = {
  treeId: string
  options: PDFRendererOptions
  children: ReactNode
}

export function PDFRendererProvider({ treeId, options, children }: PDFRendererProviderProps) {
  const value = useMemo(() => ({
    treeId,
    options,
  }), [
    treeId,
    options,
  ])

  return (
    <PDFRendererContext.Provider value={value}>
      {children}
    </PDFRendererContext.Provider>
  )
}

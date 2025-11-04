import { PDFRendererProvider, PDFRendererProviderProps } from "@/features/pdf-renderer/pdf-renderer-context"
import { Trees } from "@/features/trees/trees.module"
import { PDFRenderNode } from "@/features/pdf-renderer/pdf-render-node"

export type PDFRendererProps = Omit<PDFRendererProviderProps, "children"> & {
  treeId: string
}

export function PDFRenderer({ treeId, ...props }: PDFRendererProps) {
  const rootNode = Trees.useRootNode(treeId)

  return (
    <PDFRendererProvider
      treeId={treeId}
      {...props}
    >
      <PDFRenderNode node={rootNode} />
    </PDFRendererProvider>
  )
}

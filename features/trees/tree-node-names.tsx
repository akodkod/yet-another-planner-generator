import { TreeNode, TreeNodeType } from "@/features/trees/tree"
import { truncate } from "@/lib/utils/string"
import { match } from "ts-pattern"

export function getTreeNodeName(node: TreeNode) {
  return match(node)
    .with({ type: TreeNodeType.Root }, (node) => `Planner ${node.data.year}`)
    .with({ type: TreeNodeType.Year }, () => "Year")
    .with({ type: TreeNodeType.Month }, () => "Month")
    .with({ type: TreeNodeType.Week }, () => "Week")
    .with({ type: TreeNodeType.Day }, () => "Day")
    .with({ type: TreeNodeType.Page }, (node) => node.data.name.trim() || "Page")
    .with({ type: TreeNodeType.ColumnBlock }, () => "Vertical Blocks")
    .with({ type: TreeNodeType.RowBlock }, () => "Horizontal Blocks")
    .with({ type: TreeNodeType.TextBlock }, (node) => truncate(node.data.content, 40).trim())
    .with({ type: TreeNodeType.BackgroundGridBlock }, () => "Background Grid")
    .exhaustive()
}

export const treeNodeNamesMap: Record<TreeNodeType, string> = {
  [TreeNodeType.Root]: "Planner",
  [TreeNodeType.Year]: "Year",
  [TreeNodeType.Month]: "Month",
  [TreeNodeType.Week]: "Week",
  [TreeNodeType.Day]: "Day",
  [TreeNodeType.Page]: "Page",
  [TreeNodeType.ColumnBlock]: "Vertical Blocks",
  [TreeNodeType.RowBlock]: "Horizontal Blocks",
  [TreeNodeType.TextBlock]: "Text",
  [TreeNodeType.BackgroundGridBlock]: "Background Grid",
}

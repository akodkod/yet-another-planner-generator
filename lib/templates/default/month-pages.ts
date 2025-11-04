import { BlockSizeType } from "@/features/blocks/block-types"
import { PageNode, TreeNodeType } from "@/features/trees/tree"
import { genTreeNodeId } from "@/features/trees/tree-gen"

export const DefaultTemplateMonthStartsPage: PageNode = {
  id: genTreeNodeId(TreeNodeType.Page),
  type: TreeNodeType.Page,
  data: {
    name: "Month starts",
  },
  children: [
    {
      id: genTreeNodeId(TreeNodeType.ColumnBlock),
      type: TreeNodeType.ColumnBlock,
      data: {
        spacing: 0,
        style: {
          alignItems: "center",
          justifyContent: "center",
          transform: [
            { operation: "skew", value: [0, -6] },
          ],
        },
        width: {
          type: BlockSizeType.Full,
        },
        height: {
          type: BlockSizeType.Full,
        },
      },
      children: [
        {
          id: genTreeNodeId(TreeNodeType.TextBlock),
          type: TreeNodeType.TextBlock,
          data: {
            content: "{{format-date monthDate 'MMMM'}}",
            style: {},
            textStyle: {
              fontSize: 192,
              fontWeight: "bold",
            },
            width: {
              type: BlockSizeType.Auto,
            },
            height: {
              type: BlockSizeType.Auto,
            },
          },
          children: [],
        },
        {
          id: genTreeNodeId(TreeNodeType.TextBlock),
          type: TreeNodeType.TextBlock,
          data: {
            content: "New month incoming!",
            style: {},
            textStyle: {
              color: "#aaa",
              fontSize: 48,
              fontFamily: "Helvetica",
              lineHeight: 1,
            },
            width: {
              type: BlockSizeType.Auto,
            },
            height: {
              type: BlockSizeType.Auto,
            },
          },
          children: [],
        },
      ],
    },
  ],
}

export const DefaultTemplateMonthEndsPage: PageNode = {
  id: genTreeNodeId(TreeNodeType.Page),
  type: TreeNodeType.Page,
  data: {
    name: "Month ends",
  },
  children: [
    {
      id: genTreeNodeId(TreeNodeType.ColumnBlock),
      type: TreeNodeType.ColumnBlock,
      data: {
        spacing: 0,
        style: {
          alignItems: "center",
          justifyContent: "center",
          transform: [
            { operation: "skew", value: [0, -6] },
          ],
        },
        width: {
          type: BlockSizeType.Full,
        },
        height: {
          type: BlockSizeType.Full,
        },
      },
      children: [
        {
          id: genTreeNodeId(TreeNodeType.TextBlock),
          type: TreeNodeType.TextBlock,
          data: {
            content: "Bye {{format-date monthDate 'MMMM'}}",
            style: {},
            textStyle: {
              fontSize: 192,
              fontWeight: "bold",
            },
            width: {
              type: BlockSizeType.Auto,
            },
            height: {
              type: BlockSizeType.Auto,
            },
          },
          children: [],
        },
        {
          id: genTreeNodeId(TreeNodeType.TextBlock),
          type: TreeNodeType.TextBlock,
          data: {
            content: "See you next month!",
            style: {},
            textStyle: {
              color: "#aaa",
              fontSize: 48,
              fontFamily: "Helvetica",
              lineHeight: 1,
            },
            width: {
              type: BlockSizeType.Auto,
            },
            height: {
              type: BlockSizeType.Auto,
            },
          },
          children: [],
        },
      ],
    },
  ],
}

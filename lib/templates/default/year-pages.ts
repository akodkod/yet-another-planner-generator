import { BlockSizeType } from "@/features/blocks/block-types"
import { genId, genBlockId } from "@/lib/templates/template-utils"
import { PageNode, TreeNodeType } from "@/features/trees/tree"
import { genTreeNodeId } from "@/features/trees/tree-gen"

export const DefaultTemplateYearStartsPage: PageNode = {
  id: genId(),
  type: TreeNodeType.Page,
  data: {
    name: "Year starts",
  },
  children: [
    {
      id: genBlockId(),
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
          id: genBlockId(),
          type: TreeNodeType.TextBlock,
          data: {
            content: "{{year}}",
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
          id: genBlockId(),
          type: TreeNodeType.TextBlock,
          data: {
            content: "Super Cool Planner",
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

export const DefaultTemplateYearEndsPage: PageNode = {
  id: genId(),
  type: TreeNodeType.Page,
  data: {
    name: "Year ends",
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
            content: "Bye {{year}}",
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
            content: "See you next year!",
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

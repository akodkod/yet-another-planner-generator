import { BackgroundGridSpacing, BackgroundGridType, BlockSizeType } from "@/features/blocks/block-types"
import { genId, genBlockId } from "@/lib/templates/template-utils"
import { PageNode, TreeNodeType } from "@/features/trees/tree"
import { genTreeNodeId } from "@/features/trees/tree-gen"

export const DefaultTemplateWeekStartsPage1: PageNode = {
  id: genTreeNodeId(TreeNodeType.Page),
  type: TreeNodeType.Page,
  data: {
    name: "Week starts",
    style: {
      padding: 32,
    },
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
            content: "Week #{{weekOfMonth}}",
            style: {},
            textStyle: {
              fontSize: 192 / 1.5,
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
            content: "Super Cool Planner",
            style: {},
            textStyle: {
              color: "#aaa",
              fontSize: 48 / 1.5,
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

export const DefaultTemplateWeekStartsPage2: PageNode = {
  id: genTreeNodeId(TreeNodeType.Page),
  type: TreeNodeType.Page,
  data: {
    name: "Tasks",
    style: {
      padding: 32,
    },
  },
  children: [
    {
      id: genTreeNodeId(TreeNodeType.ColumnBlock),
      type: TreeNodeType.ColumnBlock,
      data: {
        spacing: 0,
        style: {
          padding: 96,
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
          id: genTreeNodeId(TreeNodeType.RowBlock),
          type: TreeNodeType.RowBlock,
          data: {
            spacing: 16,
            style: {
              alignItems: "center",
              justifyContent: "space-between",
            },
            width: {
              type: BlockSizeType.Full,
            },
            height: {
              type: BlockSizeType.Auto,
            },
          },
          children: [
            {
              id: genTreeNodeId(TreeNodeType.TextBlock),
              type: TreeNodeType.TextBlock,
              data: {
                content: "Let's plan this week",
                style: {},
                textStyle: {
                  fontSize: 48,
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
                content: "Week #{{weekOfMonth}} of {{format-date weekStartDate 'MMMM'}}",
                style: {
                  marginTop: 8,
                },
                textStyle: {
                  color: "#aaa",
                  fontSize: 24,
                  fontFamily: "Helvetica",
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
        {
          id: genTreeNodeId(TreeNodeType.BackgroundGridBlock),
          type: TreeNodeType.BackgroundGridBlock,
          data: {
            gridType: BackgroundGridType.Dots,
            gridColor: "#ccc",
            gridLineWidth: 1,
            gridSpacing: BackgroundGridSpacing.Small,
            style: {
              marginTop: 24,
            },
            width: {
              type: BlockSizeType.Full,
            },
            height: {
              type: BlockSizeType.Full,
            },
          },
          children: [],
        },
        {
          id: genTreeNodeId(TreeNodeType.RowBlock),
          type: TreeNodeType.RowBlock,
          data: {
            spacing: 16,
            style: {
              alignItems: "center",
              justifyContent: "space-between",
            },
            width: {
              type: BlockSizeType.Full,
            },
            height: {
              type: BlockSizeType.Auto,
            },
          },
          children: [
            {
              id: genTreeNodeId(TreeNodeType.TextBlock),
              type: TreeNodeType.TextBlock,
              data: {
                content: "One day on this week",
                style: {
                  marginTop: 48,
                },
                textStyle: {
                  fontSize: 48,
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
                content: "Week #{{weekOfMonth}} of {{format-date weekStartDate 'MMMM'}}",
                style: {
                  marginTop: 8,
                },
                textStyle: {
                  color: "#aaa",
                  fontSize: 24,
                  fontFamily: "Helvetica",
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
        {
          id: genTreeNodeId(TreeNodeType.BackgroundGridBlock),
          type: TreeNodeType.BackgroundGridBlock,
          data: {
            gridType: BackgroundGridType.Dots,
            gridColor: "#ccc",
            gridLineWidth: 1,
            gridSpacing: BackgroundGridSpacing.Small,
            style: {
              marginTop: 24,
            },
            width: {
              type: BlockSizeType.Full,
            },
            height: {
              type: BlockSizeType.Full,
            },
          },
          children: [],
        },
      ],
    },
  ],
}

export const DefaultTemplateWeekEndsPage: PageNode = {
  id: genId(),
  type: TreeNodeType.Page,
  data: {
    name: "Tasks",
    style: {
      padding: 32,
    },
  },
  children: [
    {
      id: genTreeNodeId(TreeNodeType.ColumnBlock),
      type: TreeNodeType.ColumnBlock,
      data: {
        spacing: 0,
        style: {
          padding: 96,
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
          id: genTreeNodeId(TreeNodeType.RowBlock),
          type: TreeNodeType.RowBlock,
          data: {
            spacing: 16,
            style: {
              alignItems: "center",
              justifyContent: "space-between",
            },
            width: {
              type: BlockSizeType.Full,
            },
            height: {
              type: BlockSizeType.Auto,
            },
          },
          children: [
            {
              id: genTreeNodeId(TreeNodeType.TextBlock),
              type: TreeNodeType.TextBlock,
              data: {
                content: "Week is over\r\nLet's review past week",
                style: {},
                textStyle: {
                  fontSize: 48,
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
                content: "Week #{{weekOfMonth}} of {{format-date weekStartDate 'MMMM'}}",
                style: {
                  marginTop: 8,
                },
                textStyle: {
                  color: "#aaa",
                  fontSize: 24,
                  fontFamily: "Helvetica",
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
        {
          id: genTreeNodeId(TreeNodeType.BackgroundGridBlock),
          type: TreeNodeType.BackgroundGridBlock,
          data: {
            gridType: BackgroundGridType.Dots,
            gridColor: "#ccc",
            gridLineWidth: 1,
            gridSpacing: BackgroundGridSpacing.Small,
            style: {
              marginTop: 24,
            },
            width: {
              type: BlockSizeType.Full,
            },
            height: {
              type: BlockSizeType.Full,
            },
          },
          children: [],
        },

        {
          id: genTreeNodeId(TreeNodeType.RowBlock),
          type: TreeNodeType.RowBlock,
          data: {
            spacing: 16,
            style: {
              alignItems: "center",
              justifyContent: "space-between",
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
              id: genTreeNodeId(TreeNodeType.ColumnBlock),
              type: TreeNodeType.ColumnBlock,
              data: {
                spacing: 0,
                style: {
                  padding: 96,
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
                  id: genTreeNodeId(TreeNodeType.RowBlock),
                  type: TreeNodeType.RowBlock,
                  data: {
                    spacing: 16,
                    style: {
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                    width: {
                      type: BlockSizeType.Full,
                    },
                    height: {
                      type: BlockSizeType.Auto,
                    },
                  },
                  children: [
                    {
                      id: genTreeNodeId(TreeNodeType.TextBlock),
                      type: TreeNodeType.TextBlock,
                      data: {
                        content: "What was good?",
                        style: {},
                        textStyle: {
                          fontSize: 48,
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
                        content: "",
                        style: {
                          marginTop: 8,
                        },
                        textStyle: {
                          color: "#aaa",
                          fontSize: 24,
                          fontFamily: "Helvetica",
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
                {
                  id: genTreeNodeId(TreeNodeType.BackgroundGridBlock),
                  type: TreeNodeType.BackgroundGridBlock,
                  data: {
                    gridType: BackgroundGridType.Dots,
                    gridColor: "#ccc",
                    gridLineWidth: 1,
                    gridSpacing: BackgroundGridSpacing.Small,
                    style: {
                      marginTop: 24,
                    },
                    width: {
                      type: BlockSizeType.Full,
                    },
                    height: {
                      type: BlockSizeType.Full,
                    },
                  },
                  children: [],
                },
              ],
            },
            {
              id: genTreeNodeId(TreeNodeType.ColumnBlock),
              type: TreeNodeType.ColumnBlock,
              data: {
                spacing: 0,
                style: {
                  padding: 96,
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
                  id: genTreeNodeId(TreeNodeType.RowBlock),
                  type: TreeNodeType.RowBlock,
                  data: {
                    spacing: 16,
                    style: {
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                    width: {
                      type: BlockSizeType.Full,
                    },
                    height: {
                      type: BlockSizeType.Auto,
                    },
                  },
                  children: [
                    {
                      id: genBlockId(),
                      type: TreeNodeType.TextBlock,
                      data: {
                        content: "What was bad?",
                        style: {},
                        textStyle: {
                          fontSize: 48,
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
                        content: "",
                        style: {
                          marginTop: 8,
                        },
                        textStyle: {
                          color: "#aaa",
                          fontSize: 24,
                          fontFamily: "Helvetica",
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
                {
                  id: genTreeNodeId(TreeNodeType.BackgroundGridBlock),
                  type: TreeNodeType.BackgroundGridBlock,
                  data: {
                    gridType: BackgroundGridType.Dots,
                    gridColor: "#ccc",
                    gridLineWidth: 1,
                    gridSpacing: BackgroundGridSpacing.Small,
                    style: {
                      marginTop: 24,
                    },
                    width: {
                      type: BlockSizeType.Full,
                    },
                    height: {
                      type: BlockSizeType.Full,
                    },
                  },
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

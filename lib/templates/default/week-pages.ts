import { BackgroundGridSpacing, BackgroundGridType, BlockSizeType } from "@/features/blocks/block-types"
import { genChapterId, genBlockId } from "@/lib/templates/template-utils"
import { PageChapterTreeNode, TreeNodeType } from "@/features/trees/tree"
import { genTreeNodeId } from "@/features/trees/tree-gen"

export const DefaultTemplateWeekStartsPage1: PageChapterTreeNode = {
  id: genTreeNodeId(TreeNodeType.PageChapter),
  type: TreeNodeType.PageChapter,
  chapter: {
    name: "Week starts",
  },
  children: [
    {
      id: genTreeNodeId(TreeNodeType.ColumnBlock),
      type: TreeNodeType.ColumnBlock,
      block: {
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
          block: {
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
          block: {
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

export const DefaultTemplateWeekStartsPage2: PageChapterTreeNode = {
  id: genTreeNodeId(TreeNodeType.PageChapter),
  type: TreeNodeType.PageChapter,
  chapter: {
    name: "Tasks",
  },
  children: [
    {
      id: genTreeNodeId(TreeNodeType.ColumnBlock),
      type: TreeNodeType.ColumnBlock,
      block: {
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
          block: {
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
              block: {
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
              block: {
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
          block: {
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
          block: {
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
              block: {
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
              block: {
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
          block: {
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

export const DefaultTemplateWeekEndsPage: PageChapterTreeNode = {
  id: genChapterId(),
  type: TreeNodeType.PageChapter,
  chapter: {
    name: "Tasks",
  },
  children: [
    {
      id: genTreeNodeId(TreeNodeType.ColumnBlock),
      type: TreeNodeType.ColumnBlock,
      block: {
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
          block: {
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
              block: {
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
              block: {
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
          block: {
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
          block: {
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
              block: {
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
                  block: {
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
                      block: {
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
                      block: {
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
                  block: {
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
              block: {
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
                  block: {
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
                      block: {
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
                      block: {
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
                  block: {
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

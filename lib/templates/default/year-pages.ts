import { BlockType, BlockSizeType } from "@/features/blocks/block-types"
import { PageChapter, ChapterType } from "@/features/chapters/chapter-types"
import { genChapterId, genBlockId } from "@/features/editor/editor-utils"

export const DefaultTemplateYearStartsPage: PageChapter = {
  id: genChapterId(),
  type: ChapterType.Page,
  template: {
    id: genBlockId(),
    type: BlockType.Column,
    spacing: 0,
    style: {
      alignItems: "center",
      justifyContent: "center",
      transform: "skewY(-6deg)",
    },
    width: {
      type: BlockSizeType.Full,
    },
    height: {
      type: BlockSizeType.Full,
    },
    children: [
      {
        id: genBlockId(),
        type: BlockType.Text,
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
      {
        id: genBlockId(),
        type: BlockType.Text,
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
    ],
  },
}

export const DefaultTemplateYearEndsPage: PageChapter = {
  id: genChapterId(),
  type: ChapterType.Page,
  template: {
    id: genBlockId(),
    type: BlockType.Column,
    spacing: 0,
    style: {
      alignItems: "center",
      justifyContent: "center",
      transform: "skewY(-6deg)",
    },
    width: {
      type: BlockSizeType.Full,
    },
    height: {
      type: BlockSizeType.Full,
    },
    children: [
      {
        id: genBlockId(),
        type: BlockType.Text,
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
      {
        id: genBlockId(),
        type: BlockType.Text,
        content: "Year is over :)",
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
    ],
  },
}

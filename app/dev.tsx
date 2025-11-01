import { BackgroundGridSpacing, BackgroundGridType, BlockSizeType, BlockType } from "@/features/blocks/block-types"
import { ChapterType, PageChapter, RootChapter } from "@/features/chapters/chapter-types"
import { createFileRoute } from "@tanstack/react-router"
import { PDFViewer } from "@react-pdf/renderer"
import { RenderPlanner } from "@/features/chapters/chapters-renderer"

const coverPageExample: PageChapter = {
  id: "1",
  type: ChapterType.Page,
  template: {
    id: "1",
    type: BlockType.Column,
    spacing: 0,
    style: {
      alignItems: "center",
      justifyContent: "center",
      transform: "skewY(-6deg)",
    },
    width: { type: BlockSizeType.Full },
    height: { type: BlockSizeType.Full },
    children: [
      {
        id: "2",
        type: BlockType.Text,
        content: "2025",
        style: {},
        textStyle: {
          fontSize: 96 * 2,
          fontWeight: "bold",
        },
        width: { type: BlockSizeType.Auto },
        height: { type: BlockSizeType.Auto },
      },
      {
        id: "3",
        type: BlockType.Text,
        content: "Super Cool Planner",
        style: {},
        textStyle: {
          color: "#aaa",
          fontSize: 24 * 2,
          lineHeight: 1,
        },
        width: { type: BlockSizeType.Auto },
        height: { type: BlockSizeType.Auto },
      },
    ],
  },
}

const dayPageExample: PageChapter = {
  id: "1",
  type: ChapterType.Page,
  template: {
    id: "1",
    type: BlockType.Column,
    spacing: 0,
    style: {
      padding: 96,
    },
    width: { type: BlockSizeType.Full },
    height: { type: BlockSizeType.Full },
    children: [
      {
        id: "hihi",
        type: BlockType.Row,
        spacing: 16,
        style: {
          alignItems: "center",
          justifyContent: "space-between",
        },
        width: { type: BlockSizeType.Full },
        height: { type: BlockSizeType.Auto },
        children: [
          {
            id: "2",
            type: BlockType.Text,
            content: "{{format-date dayDate \"do 'of' LLLL\"}}",
            style: {},
            textStyle: {
              fontSize: 48,
              fontFamily: "Times-Bold",
            },
            width: { type: BlockSizeType.Auto },
            height: { type: BlockSizeType.Auto },
          },
          {
            id: "3",
            type: BlockType.Text,
            content: "{{format-date dayDate 'EEEE'}}",
            style: {
              marginTop: 8,
            },
            textStyle: {
              color: "#aaa",
              fontSize: 24,
              fontFamily: "Helvetica",
            },
            width: { type: BlockSizeType.Auto },
            height: { type: BlockSizeType.Auto },
          },
        ],
      },
      {
        id: "4",
        type: BlockType.BackgroundGrid,
        gridType: BackgroundGridType.Dots,
        gridColor: "#ccc",
        gridLineWidth: 1,
        gridSpacing: BackgroundGridSpacing.Small,
        style: {
          marginTop: 24,
        },
        width: { type: BlockSizeType.Full },
        height: { type: BlockSizeType.Full },
      },
    ],
  },
}

const chaptersExample: RootChapter = {
  id: "0",
  type: ChapterType.Root,
  children: [
    coverPageExample,
    {
      id: "2",
      type: ChapterType.Year,
      children: [
        {
          id: "3",
          type: ChapterType.Month,
          children: [
            {
              id: "4",
              type: ChapterType.Week,
              children: [
                {
                  id: "5",
                  type: ChapterType.Day,
                  children: [
                    dayPageExample,
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const year = 2025
const startDate = new Date(year, 0, 1)
const endDate = new Date(year, 0, 31)
const pageWidth = 1620
const pageHeight = 2160

export const Route = createFileRoute("/dev")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-screen w-screen bg-linear-to-r from-cyan-100 to-blue-100 grid place-items-center">
      <div className="overflow-hidden shadow-xs rounded-xl p-4 bg-white">
        <PDFViewer
          showToolbar={false}
          width={pageWidth / 3}
          height={pageHeight / 3}
          className="overflow-hidden"
        >
          <RenderPlanner
            rootChapter={chaptersExample}
            rootContext={{
              startDate,
              endDate,
              pageWidth,
              pageHeight,
            }}
          />
        </PDFViewer>
      </div>
    </div>
  )
}

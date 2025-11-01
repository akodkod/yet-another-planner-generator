import { Separator } from "@/lib/ui/separator"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-linear-to-r from-cyan-100 to-blue-100 grid place-items-center">
      <div className="max-w-7xl w-full flex gap-8 h-[75vh]">
        <div className="bg-background p-6 rounded-xl shadow-sm flex-1">
          b
        </div>

        <Separator
          orientation="vertical"
          className="bg-black/3"
        />

        <div className="bg-background p-6 rounded-xl shadow-sm flex-1">
          a
        </div>
      </div>
    </div>
  )
}

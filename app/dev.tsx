import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dev")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-screen w-screen bg-linear-to-r from-cyan-100 to-blue-100 grid place-items-center">
      <div className="overflow-hidden shadow-xs rounded-xl p-4 bg-white">
        Hi!
      </div>
    </div>
  )
}

import { PropsWithChildren } from "react"

export default ({ children }: PropsWithChildren) => (
  <main className="w-full min-h-screen flex flex-col items-center py-10 pt-[calc(1rem+4rem)] px-4">{children}</main>
)

import { Suspense } from "react"

import AsideFilter from "@/components/main/AsideFilter"
import GridProducts from "@/components/main/GridProducts"

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center py-10 pt-[calc(1rem+4rem)] px-4">
      <section className="w-full max-w-[var(--width-page)] grid grid-cols-[20rem_minmax(0,1fr)] gap-10">
        <Suspense fallback={<div className="w-full" />}>
          <AsideFilter />
        </Suspense>
        <Suspense fallback={<div className="w-full" />}>
          <GridProducts />
        </Suspense>
      </section>
    </main>
  )
}

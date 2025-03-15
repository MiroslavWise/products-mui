import { cache } from "react"
import { Alert } from "@mui/material"

import ComponentDetails from "@/components/product/ComponentDetails"

import { getProductId } from "@/services/products"
import ComponentReviews from "@/components/product/ComponentReviews"
import ComponentDescription from "@/components/product/ComponentDescription"

const getCache = cache(getProductId)

interface IParams {
  params: Promise<{ id: string }>
}

export default async ({ params }: IParams) => {
  const { id } = await params
  const product = await getCache(id)

  const { title, reviews = [], rating } = product ?? {}

  if (!title)
    return (
      <div className="w-full h-full min-h-screen gap-12 flex flex-col items-center justify-center px-5 py-5">
        <Alert variant="filled" severity="error">
          Данный товар отсутствует
        </Alert>
      </div>
    )

  return (
    <section className="w-full max-w-[var(--width-page)] flex flex-col gap-4">
      <ComponentDetails {...product} />
      <ComponentDescription {...product} />
      <ComponentReviews reviews={reviews} rating={rating} />
    </section>
  )
}

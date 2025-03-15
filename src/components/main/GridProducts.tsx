"use client"

import Stack from "@mui/material/Stack"
import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs"
import Masonry from "@mui/lab/Masonry"

import { EOrder, ESortBy, LIMIT_PAGE } from "@/types/enum"

import CardProduct from "../common/CardProduct"

import { getProducts, IQueryProducts } from "@/services/products"
import PaginationMemo from "../common/PaginationMemo"
import { Box, Skeleton } from "@mui/material"

interface IFilter {
  order?: EOrder | null
  sortBy?: ESortBy | null
  page?: number | null
}

const filterObj = ({ order, sortBy, page }: IFilter) => {
  const obj: IQueryProducts = {
    limit: LIMIT_PAGE,
    skip: 0,
  }

  if (order && sortBy) {
    obj.order = order
    obj.sortBy = sortBy
  }

  if (page) {
    obj.skip = (page - 1) * LIMIT_PAGE
  }

  return obj
}

function GridProducts() {
  const [order] = useQueryState("order", parseAsStringEnum<EOrder>(Object.values(EOrder)))
  const [sortBy] = useQueryState("sortBy", parseAsStringEnum<ESortBy>(Object.values(ESortBy)))
  const [page] = useQueryState("page", parseAsInteger)

  const filter = filterObj({ order, sortBy, page })

  const { data, isLoading } = useQuery({
    queryFn: () => getProducts(filter),
    queryKey: ["products", filter],
  })

  const products = data?.products ?? []
  const total = data?.total

  return (
    <Stack spacing={2}>
      <Masonry columns={3} spacing={2} className="w-full">
        {isLoading
          ? Array.from({ length: LIMIT_PAGE }).map((_, index) => (
              <Box key={index} sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
                <Skeleton variant="rectangular" className="w-full" height={118} />
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Box>
            ))
          : products.map((item) => <CardProduct key={`sd-f-d-${item.id}`} {...item} />)}
      </Masonry>
      {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       
      </div> */}
      <PaginationMemo total={total} />
    </Stack>
  )
}

GridProducts.displayName = "GridProducts"
export default GridProducts

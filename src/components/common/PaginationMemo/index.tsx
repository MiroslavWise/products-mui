"use client"

import { useEffect, useState } from "react"
import Pagination from "@mui/material/Pagination"
import { parseAsInteger, useQueryState } from "nuqs"

import { LIMIT_PAGE } from "@/types/enum"

interface IProps {
  total?: number
}

const toCount = (total?: number) => (total ? Math.floor(total / LIMIT_PAGE) : 0)

function PaginationMemo({ total }: IProps) {
  const [count, setCount] = useState(toCount(total))
  const [page, setPage] = useQueryState("page", parseAsInteger)

  useEffect(() => {
    if (typeof total === "number") {
      setCount(toCount(total))
    }
  }, [total])

  return <Pagination count={count} page={page ?? 1} shape="rounded" onChange={(_, number) => setPage(number)} />
}

PaginationMemo.displayName = "PaginationMemo"
export default PaginationMemo

"use client"

import Link from "next/link"
import { Alert } from "@mui/material"
import Masonry from "@mui/lab/Masonry"

import { IProduct } from "@/services/products"

import CardProduct from "../common/CardProduct"

import { useCart } from "@/store/useCart"

function ComponentClientList() {
  const products = useCart((_) => _)

  const items: IProduct[] = Object.values(products)

  if (items.length === 0)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Alert severity="warning" className="max-w-[25rem]">
          Корзина пуста! Если хотите что-то добавить - перейдите на <Link href="/">главную</Link>
        </Alert>
      </div>
    )

  return (
    <Masonry columns={3} spacing={2} className="w-full">
      {items.map((item) => (
        <CardProduct key={`sd-f-d-${item.id}`} {...item} />
      ))}
    </Masonry>
  )
}

ComponentClientList.displayName = "ComponentClientList"
export default ComponentClientList

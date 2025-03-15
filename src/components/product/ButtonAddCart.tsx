"use client"

import { Button } from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"

import { IProduct } from "@/services/products"

import { dispatchProductCart, useCart } from "@/store/useCart"

function ButtonAddCart(props: IProduct) {
  const objCart = useCart((_) => _)

  const is = Object.keys(objCart).includes(String(props.id))

  const handle = () => dispatchProductCart(props)

  return (
    <Button
      variant="outlined"
      startIcon={is ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />}
      className="w-fit whitespace-nowrap"
      onClick={handle}
    >
      {is ? "Удалить из корзины" : "Добавить в корзину"}
    </Button>
  )
}

ButtonAddCart.displayName = "ButtonAddCart"
export default ButtonAddCart

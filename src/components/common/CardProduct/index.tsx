import Card from "@mui/material/Card"
import Rating from "@mui/material/Rating"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import CardContent from "@mui/material/CardContent"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"

import { IProduct } from "@/services/products"

import { dispatchProductCart, useCart } from "@/store/useCart"
import Link from "next/link"

function CardProduct(props: IProduct) {
  const { thumbnail, title, description, price, id, rating } = props ?? {}

  const objCart = useCart((_) => _)

  const is = Object.keys(objCart).includes(String(id))

  return (
    <Link href={{ pathname: `/product/${id}` }} prefetch={false}>
      <Card>
        <CardMedia sx={{ aspectRatio: 2 / 1 }} image={thumbnail} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className="line-clamp-2 text-ellipsis">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} className="line-clamp-4 text-ellipsis text-xs">
            {description}
          </Typography>
          <Rating name="read-only" value={rating ?? 0} readOnly precision={0.25} />
          <div className="w-full flex flex-row items-center justify-between gap-4">
            <IconButton
              color="primary"
              aria-label="Добавить в корзину"
              onClick={(event) => {
                event.stopPropagation()
                event.preventDefault()
                dispatchProductCart(props)
              }}
            >
              {is ? <RemoveShoppingCartIcon fontSize="medium" /> : <AddShoppingCartIcon fontSize="medium" />}
            </IconButton>
            <Typography gutterBottom variant="body1" component="b" className="mt-auto font-semibold m-0">
              {price}$
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

CardProduct.displayName = "CardProduct"
export default CardProduct

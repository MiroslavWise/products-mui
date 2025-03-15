import { Card } from "@mui/material"

import ButtonAddCart from "./ButtonAddCart"
import ComponentImage from "./ComponentImage"

import { IProduct } from "@/services/products"

function ComponentDetails(props: IProduct) {
  const { thumbnail, title, category, minimumOrderQuantity, price } = props ?? {}

  return (
    <Card className="h-full p-4 flex flex-col gap-1">
      <ComponentImage image={thumbnail} />
      <h1 className="text-5xl font-bold pb-6">{title}</h1>
      <p>
        <span className="text-lg font-bold pr-4">Категория:</span>
        {category}
      </p>
      <p>
        <span className="text-lg font-bold pr-4">Цена:</span>$ {price}
      </p>
      <p>
        <span className="text-lg font-bold pr-4">В наличии:</span>
        {minimumOrderQuantity}
      </p>
      <ButtonAddCart {...props} />
    </Card>
  )
}

ComponentDetails.displayName = "ComponentDetails"
export default ComponentDetails

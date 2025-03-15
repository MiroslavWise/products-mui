import { Card, Typography } from "@mui/material"

import { IProduct } from "@/services/products"

function ComponentDescription(props: IProduct) {
  const { description } = props ?? {}

  return (
    <Card className="h-full p-4 flex flex-col gap-2">
      <div className="max-w-[52.25rem]">
        <h2 className="text-3xl font-bold">Описание товара</h2>
        <Typography variant="body2" gutterBottom>
          {description}
        </Typography>
      </div>
    </Card>
  )
}

ComponentDescription.displayName = "ComponentDescription"
export default ComponentDescription

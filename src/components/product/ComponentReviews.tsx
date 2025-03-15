import { Fragment } from "react"
import { Avatar, Box, Card, Divider, List, ListItem, ListItemAvatar, ListItemText, Rating } from "@mui/material"

import { IReview } from "@/services/products"

const labels: { [index: string]: string } = {
  0.5: "Бесполезно",
  1: "Бесполезно+",
  1.5: "Плохо",
  2: "Плохо+",
  2.5: "Не плохо",
  3: "Не плохо+",
  3.5: "Хорошо",
  4: "Хорошо+",
  4.5: "Отлично",
  5: "Отлично+",
}

function ComponentReviews({ reviews, rating }: { reviews: IReview[]; rating: number }) {
  return (
    <Card className="h-full p-4 flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Отзывы пользователей</h2>
      <div className="w-full flex flex-col">
        <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
          <Rating name="hover-feedback" value={rating} precision={0.5} readOnly />
          <Box sx={{ ml: 2 }}>{labels[rating]}</Box>
        </Box>
      </div>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {reviews.map((item, index) => (
          <Fragment key={`sdf-${index}-${item.reviewerEmail}`}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={item.reviewerName} src={item.reviewerName} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div className="flex flex-row items-center gap-2">
                    <span>{item.reviewerName}</span>
                    <Rating name="hover-feedback" value={item.rating} precision={0.5} readOnly />
                  </div>
                }
                secondary={<Fragment>{item.comment}</Fragment>}
              />
            </ListItem>
            {index !== reviews.length - 1 && <Divider variant="inset" component="li" />}
          </Fragment>
        ))}
      </List>
    </Card>
  )
}

ComponentReviews.displayName = "ComponentReviews"
export default ComponentReviews

{
  /*  */
}

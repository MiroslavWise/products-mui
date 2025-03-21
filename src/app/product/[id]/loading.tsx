import Stack from "@mui/material/Stack"
import Skeleton from "@mui/material/Skeleton"

export default () => (
  <Stack spacing={1}>
    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

    <Skeleton variant="circular" width={40} height={40} />
    <Skeleton variant="rectangular" width={210} height={60} />
    <Skeleton variant="rounded" width={210} height={60} />
  </Stack>
)

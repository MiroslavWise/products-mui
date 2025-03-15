import { Alert } from "@mui/material"

export const dynamic = "force-static"
export const dynamicParams = false

export default () => (
  <div className="w-full h-full min-h-screen gap-12 flex flex-col items-center justify-center px-5 py-5">
    <Alert variant="filled" severity="error">
      Данная страница вам не доступна
    </Alert>
  </div>
)

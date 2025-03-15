"use client"

import { PropsWithChildren } from "react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider, createTheme } from "@mui/material/styles"

const theme = createTheme({
  defaultColorScheme: "dark",
})

export default ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
)

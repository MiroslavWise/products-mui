"use client"

import Badge from "@mui/material/Badge"
import Slide from "@mui/material/Slide"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

import { useCart } from "@/store/useCart"
import Link from "next/link"

interface Props {
  window?: () => Window
  children?: React.ReactElement<unknown>
}

function HideOnScroll(props: Props) {
  const { children, window } = props

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  )
}

function Header(props: Props) {
  const objCart = useCart((_) => _)

  const length = Object.keys(objCart).length

  return (
    <HideOnScroll {...props}>
      <AppBar className="flex flex-col items-center w-full px-4">
        <Toolbar className="w-full max-w-[var(--width-page)] flex flex-row items-center justify-between !px-0">
          <Link href={{ pathname: `/` }}>
            <Typography variant="h6" component="div">
              Товары
            </Typography>
          </Link>
          <Link href={{ pathname: "/cart" }} prefetch={false}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={length} color="error" className={length > 0 ? "" : "hidden"}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}

Header.displayName = "Header"
export default Header

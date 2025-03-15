"use client"

import { useState } from "react"
import TagIcon from "@mui/icons-material/Tag"
import { useQuery } from "@tanstack/react-query"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import { ArrowUpward, ArrowDownward, Sort, Close, Check } from "@mui/icons-material"
import {
  MenuItem,
  ListSubheader,
  Box,
  Divider,
  ListItemIcon,
  List,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material"

import { EOrder, ESortBy } from "@/types/enum"
import { getCategoriesProduct } from "@/services/products"

enum EOptionSort {
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
  TITLE_ASC = "title_asc",
  TITLE_DESC = "title_desc",
  NONE = "none",
}

const options = [
  {
    value: EOptionSort.PRICE_ASC,
    label: "Цена по возрастанию",
    icon: <ArrowUpward fontSize="small" />,
  },
  {
    value: EOptionSort.PRICE_DESC,
    label: "Цена по убыванию",
    icon: <ArrowDownward fontSize="small" />,
  },
  {
    value: EOptionSort.TITLE_ASC,
    label: "Название (А-Я)",
    icon: <ArrowUpward fontSize="small" />,
  },
  {
    value: EOptionSort.TITLE_DESC,
    label: "Название (Я-А)",
    icon: <ArrowDownward fontSize="small" />,
  },
  {
    value: EOptionSort.NONE,
    label: "Без сортировки",
    icon: <Close fontSize="small" />,
  },
]

const asActive = (order: EOrder | null, sortBy: ESortBy | null) => {
  if (!order || !sortBy) return EOptionSort.NONE

  if (order === EOrder.ASC) {
    if (sortBy === ESortBy.PRICE) return EOptionSort.PRICE_ASC
    if (sortBy === ESortBy.TITLE) return EOptionSort.TITLE_ASC
  }
  if (order === EOrder.DESC) {
    if (sortBy === ESortBy.PRICE) return EOptionSort.PRICE_DESC
    if (sortBy === ESortBy.TITLE) return EOptionSort.TITLE_DESC
  }

  return EOptionSort.NONE
}

const changeActive = (value: EOptionSort): [EOrder | null, ESortBy | null] => {
  switch (value) {
    case EOptionSort.PRICE_ASC:
      return [EOrder.ASC, ESortBy.PRICE]
    case EOptionSort.PRICE_DESC:
      return [EOrder.DESC, ESortBy.PRICE]
    case EOptionSort.TITLE_ASC:
      return [EOrder.ASC, ESortBy.TITLE]
    case EOptionSort.TITLE_DESC:
      return [EOrder.DESC, ESortBy.TITLE]
    default:
      return [null, null]
  }
}

function AsideFilter() {
  const [order, setOrder] = useQueryState("order", parseAsStringEnum<EOrder>(Object.values(EOrder)))
  const [sortBy, setSortBy] = useQueryState("sortBy", parseAsStringEnum<ESortBy>(Object.values(ESortBy)))
  const [_, setPage] = useQueryState("page", parseAsInteger)

  const { data } = useQuery({
    queryFn: getCategoriesProduct,
    queryKey: ["categories"],
  })

  const categories = data ?? []

  /** TODO */
  /** В данной API нет фильтрации по цене (min & max) */
  /** @default [0,1000] */
  const [priceRange, setPriceRange] = useState([0, 1000])
  /** TODO */
  /** В API есть сортировка по категории */
  const [radio, setRadio] = useState<string>("")

  const active = asActive(order, sortBy)

  const handlePriceChange = (_: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceRange(newValue)
    }
  }

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadio((event.target as HTMLInputElement).value)
  }

  return (
    <Box
      sx={{ bgcolor: "background.paper" }}
      className="w-full flex flex-col p-4 h-fit gap-3 "
      //sticky top-0 - можно добавить для фиксации сверху
    >
      <List
        subheader={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FormatListBulletedIcon fontSize="small" />{" "}
            <ListSubheader component="div" sx={{ fontWeight: "bold" }}>
              Сортировка
            </ListSubheader>
          </Box>
        }
      >
        {options.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            onClick={() => {
              const [_order, _sortBy] = changeActive(item.value)
              setPage(null)
              setOrder(_order)
              setSortBy(_sortBy)
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {item.icon}
              <span>{item.label}</span>
              {active === item.value && (
                <ListItemIcon>
                  <Check fontSize="small" />
                </ListItemIcon>
              )}
            </Box>
          </MenuItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <List
        subheader={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AttachMoneyIcon fontSize="small" />
            <ListSubheader component="div" sx={{ fontWeight: "bold" }}>
              Цена
            </ListSubheader>
          </Box>
        }
      >
        <Typography variant="body2" gutterBottom>
          От {0} до {1000} $
        </Typography>
        <Slider value={priceRange} onChange={handlePriceChange} valueLabelDisplay="auto" min={0} max={1000} sx={{ mx: 2 }} />
      </List>
      <List
        subheader={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TagIcon fontSize="small" />
            <ListSubheader component="div" sx={{ fontWeight: "bold" }}>
              Теги
            </ListSubheader>
          </Box>
        }
      >
        <RadioGroup aria-labelledby="Выбор категории продукта" name="radio-buttons-group" value={radio} onChange={handleChangeRadio}>
          {categories.map((item) => (
            <FormControlLabel key={`s-${item.slug}`} value={item.slug} control={<Radio />} label={item.name} />
          ))}
        </RadioGroup>
      </List>
    </Box>
  )
}

AsideFilter.displayName = "AsideFilter"
export default AsideFilter

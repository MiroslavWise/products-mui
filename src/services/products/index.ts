import { EOrder, ESortBy } from "@/types/enum"
import { get, URL_API } from "../instance"

const url = "/products" as const

export interface IQueryProducts {
  skip?: number
  limit?: number
  order?: EOrder
  sortBy?: ESortBy
}

export interface IReview {
  comment: string
  date: string
  rating: number
  reviewerEmail: `${string}@${string}`
  reviewerName: string
}

export interface IProduct {
  availabilityStatus: string
  brand: string
  category: string
  description: string
  discountPercentage: number
  id: number
  images: string[]
  minimumOrderQuantity: number
  price: number
  rating: number
  returnPolicy: string
  shippingInformation: string
  sku: string
  stock: number
  tags: string[]
  /** URL изображения */
  thumbnail: string
  title: string
  warrantyInformation: string
  weight: number
  reviews: IReview[]
}

interface IDataProduct {
  products: IProduct[]
  total: number
  skip: number
  limit: number
}

type TUrlCategories = `${typeof URL_API}${typeof url}/category/${string}`

export interface ICategoryProduct {
  slug: string
  name: string
  /** @examples https://dummyjson.com/products/category/groceries */
  url: TUrlCategories
}

export const getProducts = (query?: IQueryProducts) => get<IDataProduct>(url, query)
export const getCategoriesProduct = () => get<ICategoryProduct[]>(`${url}/categories`)
export const getProductId = (id: string | number) => get<IProduct>(`${url}/${id}`)

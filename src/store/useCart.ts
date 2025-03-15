import { IProduct } from "@/services/products"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export const useCart = create(
  persist<IStoreCartProducts>(() => ({}), {
    name: "||products-cart||",
    storage: createJSONStorage(() => localStorage),
    version: 0.1,
  }),
)

export const dispatchProductCart = (value: IProduct) =>
  useCart.setState((values) => {
    if (values.hasOwnProperty(value.id)) {
      const newObj: IStoreCartProducts = {}
      for (const [key, item] of Object.entries(values)) {
        if (Number(key) !== value.id) {
          newObj[key as unknown as number] = item as IProduct
        }
      }
      return newObj
    } else {
      return {
        ...values,
        [value.id]: value,
      }
    }
  }, true)

interface IStoreCartProducts {
  [key: number]: IProduct
}

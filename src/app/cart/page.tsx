import ComponentClientList from "@/components/cart/ComponentClientList"

export default () => (
  <main className="w-full min-h-screen flex flex-col items-center py-10 pt-[calc(1rem+4rem)] px-4">
    <section className="w-full max-w-[var(--width-page)] flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Корзина товаров</h2>
      <ComponentClientList />
    </section>
  </main>
)

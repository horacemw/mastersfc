import { useEffect, useMemo, useState } from 'react';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { PageHero } from '../components/PageHero';
import { Button } from '../components/Button';
import { products } from '../data/products';
import type { Product } from '../types';
import { ArrowRight, CartIcon, Close, Minus, Plus } from '../components/Icons';

interface CartItem { product: Product; size: string; qty: number }

const categories: ('All' | Product['category'])[] = ['All', 'Jerseys', 'Training', 'Lifestyle', 'Accessories'];

const formatMWK = (amount: number) => `MWK ${amount.toLocaleString('en-MW')}`;

export function StorePage() {
  useEffect(() => {
    document.title = 'Store | Masters FC';
  }, []);

  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [chosenSize, setChosenSize] = useState<string>('');

  const list = useMemo(
    () => (category === 'All' ? products : products.filter((p) => p.category === category)),
    [category]
  );

  const addToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size);
      if (existing) return prev.map((i) => (i === existing ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { product, size, qty: 1 }];
    });
    setActiveProduct(null);
    setCartOpen(true);
  };

  const subtotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const totalQty = cart.reduce((n, i) => n + i.qty, 0);

  return (
    <>
      <PageHero
        eyebrow="Club Store"
        title={<>Wear the <span className="text-lime-brand">Badge</span></>}
        description="Official Masters FC merchandise — jerseys, training wear, lifestyle and accessories."
        action={
          <Button variant="lime" size="lg" iconRight={<CartIcon />} onClick={() => setCartOpen(true)}>
            View Cart ({totalQty})
          </Button>
        }
      />

      <section className="py-14 md:py-20 bg-white">
        <div className="container-fc">
          <div className="flex items-center gap-2 flex-wrap mb-10">
            {categories.map((c) => {
              const isActive = c === category;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    isActive ? 'bg-pitch-950 text-white' : 'bg-pitch-50 text-pitch-800 hover:bg-pitch-100'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {list.length === 0 ? (
            <div className="rounded-3xl bg-pitch-50 border border-pitch-900/10 py-20 text-center">
              <p className="font-display font-bold text-xl text-pitch-950">No products in this category</p>
              <p className="mt-2 text-sm text-pitch-800/60">Check back soon for new drops.</p>
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {list.map((p) => (
                <li key={p.id} className="group rounded-3xl overflow-hidden bg-white border border-pitch-900/10 hover:border-pitch-700/30 hover:shadow-lg transition">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveProduct(p);
                      setChosenSize(p.sizes[0] ?? '');
                    }}
                    className="relative block w-full overflow-hidden"
                    aria-label={`View ${p.name}`}
                  >
                    <ImagePlaceholder
                      type="product"
                      src={p.image}
                      alt={p.name}
                      aspectRatio="1/1"
                      rounded="none"
                      className="transition-transform group-hover:scale-[1.04]"
                    />
                    {p.isNew && (
                      <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full bg-lime-brand text-pitch-950 text-[10px] font-bold uppercase tracking-widest">
                        New
                      </span>
                    )}
                  </button>
                  <div className="p-5">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-pitch-700">
                      {p.category}
                    </p>
                    <h3 className="mt-1 font-display font-bold text-lg text-pitch-950 line-clamp-1">{p.name}</h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-display font-bold text-xl text-pitch-950">
                        {formatMWK(p.price)}
                      </span>
                      <Button
                        size="sm"
                        variant="dark"
                        onClick={() => {
                          setActiveProduct(p);
                          setChosenSize(p.sizes[0] ?? '');
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-8 text-center text-xs text-pitch-800/60">
            Prices are shown as sample/demo values. Online store checkout is coming soon.
          </p>
        </div>
      </section>

      {/* Product details modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-[70] bg-pitch-950/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6" role="dialog" aria-modal="true" aria-label={activeProduct.name}>
          <div className="relative bg-white w-full md:max-w-3xl md:rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2 max-h-[92vh] md:max-h-[80vh]">
            <button
              type="button"
              onClick={() => setActiveProduct(null)}
              className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow border border-pitch-900/10"
              aria-label="Close product"
            >
              <Close />
            </button>
            <ImagePlaceholder
              type="product"
              src={activeProduct.image}
              alt={activeProduct.name}
              aspectRatio="1/1"
              rounded="none"
            />
            <div className="p-6 md:p-8 overflow-auto">
              <p className="text-[11px] font-bold uppercase tracking-widest text-pitch-700">{activeProduct.category}</p>
              <h3 className="mt-1 font-display font-bold text-2xl md:text-3xl text-pitch-950">{activeProduct.name}</h3>
              <p className="mt-2 font-display font-bold text-2xl text-pitch-950">{formatMWK(activeProduct.price)}</p>
              <p className="mt-4 text-sm text-pitch-800/80">{activeProduct.description}</p>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-pitch-950 mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.sizes.map((s) => {
                    const isActive = chosenSize === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setChosenSize(s)}
                        className={`px-4 py-2 rounded-xl border text-sm font-semibold transition ${
                          isActive
                            ? 'border-pitch-950 bg-pitch-950 text-white'
                            : 'border-pitch-900/15 text-pitch-800 hover:border-pitch-900/40'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button variant="primary" fullWidth onClick={() => addToCart(activeProduct, chosenSize)}>
                  Add to Cart
                </Button>
                <Button variant="secondary" onClick={() => setActiveProduct(null)}>
                  Close
                </Button>
              </div>
              <p className="mt-3 text-[11px] text-pitch-800/60">
                Demo cart — no payment is processed.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cart drawer */}
      <div
        className={`fixed inset-0 z-[75] transition ${cartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!cartOpen}
      >
        <button
          className={`absolute inset-0 bg-pitch-950/60 transition-opacity ${cartOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setCartOpen(false)}
          aria-label="Close cart overlay"
          tabIndex={-1}
        />
        <aside
          className={`absolute right-0 top-0 bottom-0 w-[92%] max-w-md bg-white shadow-2xl flex flex-col transition-transform ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
          role="dialog"
          aria-label="Your cart"
        >
          <div className="flex items-center justify-between p-5 border-b border-pitch-900/10">
            <h3 className="font-display font-bold text-lg text-pitch-950">Your Cart</h3>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-pitch-900/10"
              aria-label="Close cart"
            >
              <Close />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-5">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto rounded-full bg-pitch-50 flex items-center justify-center text-pitch-700">
                  <CartIcon width={28} height={28} />
                </div>
                <p className="mt-4 font-display font-bold text-pitch-950">Your cart is empty</p>
                <p className="mt-1 text-sm text-pitch-800/60">Browse the store and add your favourite items.</p>
                <div className="mt-6">
                  <Button variant="primary" onClick={() => setCartOpen(false)} iconRight={<ArrowRight />}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.map((i) => (
                  <li key={`${i.product.id}-${i.size}`} className="flex items-center gap-4 rounded-2xl border border-pitch-900/10 p-3">
                    <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden">
                      <ImagePlaceholder type="product" src={i.product.image} alt={i.product.name} rounded="none" className="h-full w-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-pitch-950 text-sm line-clamp-1">{i.product.name}</p>
                      <p className="text-[11px] text-pitch-800/70">Size {i.size}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setCart((prev) =>
                              prev
                                .map((c) => (c === i ? { ...c, qty: Math.max(0, c.qty - 1) } : c))
                                .filter((c) => c.qty > 0)
                            )
                          }
                          className="w-7 h-7 rounded-full border border-pitch-900/10 inline-flex items-center justify-center hover:bg-pitch-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">{i.qty}</span>
                        <button
                          type="button"
                          onClick={() => setCart((prev) => prev.map((c) => (c === i ? { ...c, qty: c.qty + 1 } : c)))}
                          className="w-7 h-7 rounded-full border border-pitch-900/10 inline-flex items-center justify-center hover:bg-pitch-50"
                          aria-label="Increase quantity"
                        >
                          <Plus />
                        </button>
                      </div>
                    </div>
                    <div className="font-display font-bold text-pitch-950">{formatMWK(i.product.price * i.qty)}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {cart.length > 0 && (
            <div className="border-t border-pitch-900/10 p-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-pitch-800/70">Subtotal</span>
                <span className="font-display font-bold text-xl text-pitch-950">{formatMWK(subtotal)}</span>
              </div>
              <Button variant="dark" fullWidth size="lg">Checkout</Button>
              <p className="text-[10px] text-center text-pitch-800/60">Demo cart only — no payment processed.</p>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

export default StorePage;

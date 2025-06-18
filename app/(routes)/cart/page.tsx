'use client';

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';

import Summary from './components/summary';
import CartItem from './components/cart-item';

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const items = useCart((state) => state.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>

          {items.length === 0 ? (
            <p className="mt-4 text-neutral-500">No items in your cart.</p>
          ) : (
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
              <div className="lg:col-span-7">
                <ul>
                  {items.map((item) => (
                    <CartItem key={item.variantId} item={item} />
                  ))}
                </ul>
              </div>

              <Summary />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CartPage;

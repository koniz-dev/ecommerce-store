'use client';

import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { toast } from 'react-hot-toast';

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }
    if (searchParams.get('canceled')) {
      toast.error('Payment canceled.');
    }
  }, [searchParams, removeAll]);

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const onCheckout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          items: items.map((i) => ({
            variantId: i.variantId,
            quantity: i.quantity,
          })),
        },
      );
      window.location.href = response.data.url;
    } catch {
      toast.error('Checkout failed.');
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <p className="text-base font-semibold text-black">
            {totalPrice.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
        </div>
      </div>

      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;

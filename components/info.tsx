'use client';

import { ShoppingCart } from 'lucide-react';
import { ProductInfo } from '@/types';
import { ProductVariant } from '@/types';
import Currency from '@/components/ui/currency';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { useState, useMemo } from 'react';

interface InfoProps {
  data: ProductInfo;
  currentVariant: ProductVariant;
  onVariantChange: (variant: ProductVariant) => void;
}

const Info: React.FC<InfoProps> = ({
  data,
  currentVariant,
  onVariantChange,
}) => {
  const cart = useCart();

  // Unique colors and sizes from variants
  const colors = useMemo(
    () =>
      Array.from(
        new Set(data.variants.map((v) => v.color?.value).filter(Boolean)),
      ) as string[],
    [data.variants],
  );

  const sizes = useMemo(
    () =>
      Array.from(
        new Set(data.variants.map((v) => v.size?.label).filter(Boolean)),
      ) as string[],
    [data.variants],
  );

  const [selColor, setSelColor] = useState(currentVariant.color?.value);
  const [selSize, setSelSize] = useState(currentVariant.size?.label);

  // Filter only available variants
  const availableVariants = useMemo(
    () =>
      data.variants.filter(
        (v) =>
          v.stock > 0 && v.status !== 'disabled' && v.status !== 'discontinued',
      ),
    [data.variants],
  );

  const isColorAvailable = (color: string) =>
    availableVariants.some(
      (v) =>
        v.color?.value === color &&
        (selSize ? v.size?.label === selSize : true),
    );

  const isSizeAvailable = (size: string) =>
    availableVariants.some(
      (v) =>
        v.size?.label === size &&
        (selColor ? v.color?.value === selColor : true),
    );

  const onColorSelect = (color: string) => {
    if (!isColorAvailable(color)) return;
    setSelColor(color);
    const v = availableVariants.find(
      (v) =>
        v.color?.value === color &&
        (selSize ? v.size?.label === selSize : true),
    );
    if (v) onVariantChange(v);
  };

  const onSizeSelect = (size: string) => {
    if (!isSizeAvailable(size)) return;
    setSelSize(size);
    const v = availableVariants.find(
      (v) =>
        v.size?.label === size &&
        (selColor ? v.color?.value === selColor : true),
    );
    if (v) onVariantChange(v);
  };

  const onAddToCart = () => {
    cart.addItem({
      productId: data.productId,
      variantId: currentVariant.id,
      name: data.name,
      price: currentVariant.price,
      image: currentVariant.images[0]?.url ?? '',
      size: currentVariant.size,
      color: currentVariant.color,
      quantity: 1,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">{data.name}</h1>
      {data.description && (
        <p className="mt-2 text-gray-600">{data.description}</p>
      )}

      <div className="mt-4">
        <h3 className="font-semibold">Color:</h3>
        <div className="flex space-x-2 mt-1">
          {colors.map((c) => {
            const available = isColorAvailable(c);
            return (
              <button
                key={c}
                onClick={() => onColorSelect(c)}
                disabled={!available}
                className={`h-6 w-6 rounded-full border transition-opacity duration-200 \
                  ${c === selColor ? 'ring-2 ring-primary' : ''} \
                  ${
                    !available
                      ? 'opacity-40 cursor-not-allowed'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                style={{ backgroundColor: c }}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Size:</h3>
        <div className="flex space-x-2 space-y-2 mt-1 flex-wrap">
          {sizes.map((s) => {
            const available = isSizeAvailable(s);
            return (
              <button
                key={s}
                onClick={() => onSizeSelect(s)}
                disabled={!available}
                className={`px-2 py-1 border rounded transition-opacity duration-200 \
                  ${s === selSize ? 'bg-gray-200' : ''} \
                  ${
                    !available
                      ? 'opacity-40 cursor-not-allowed'
                      : 'opacity-70 hover:opacity-100'
                  }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-2xl font-bold">
          <Currency value={currentVariant.price} />
        </p>
      </div>

      <div className="mt-6">
        <Button
          onClick={onAddToCart}
          className="flex items-center gap-x-2"
          disabled={
            currentVariant.stock === 0 ||
            currentVariant.status === 'disabled' ||
            currentVariant.status === 'discontinued'
          }
        >
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;

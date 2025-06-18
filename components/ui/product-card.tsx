'use client';

import Image from 'next/image';
import { MouseEventHandler, useState, useMemo } from 'react';
import { Expand } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Currency from '@/components/ui/currency';
import IconButton from '@/components/ui/icon-button';
import usePreviewModal from '@/hooks/use-preview-modal';
import { ProductInfo, Product, ProductVariant } from '@/types';

interface ProductCardProps {
  data: Product & { variants: ProductVariant[] };
  showColorSelector?: boolean;
  showPreviewButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  data,
  showColorSelector = true,
  showPreviewButton = true,
}) => {
  const previewModal = usePreviewModal();
  const router = useRouter();

  const uniqueColors = useMemo(() => {
    const map = new Map<string, string>();
    data.variants.forEach((v) => {
      if (v.color) map.set(v.color.value, v.color.value);
    });
    return Array.from(map.keys());
  }, [data.variants]);

  const [selectedColor, setSelectedColor] = useState<string | null>(
    uniqueColors[0] ?? null,
  );

  const selectedVariant = useMemo(
    () =>
      data.variants.find((v) => v.color?.value === selectedColor) ??
      data.variants[0],
    [data.variants, selectedColor],
  );

  const currentImage = selectedVariant?.images[0]?.url ?? '';

  const handleClick = () => {
    router.push(`/product/${data.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (!selectedVariant) return;

    previewModal.onOpen({
      productId: data.id,
      name: data.name,
      description: data.description ?? '',
      variants: data.variants,
      selectedVariantId: selectedVariant.id,
    } as ProductInfo);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-2"
    >
      {/* Image & actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        {currentImage && (
          <Image
            src={currentImage}
            alt={data.name}
            fill
            className="aspect-square object-cover rounded-md"
          />
        )}
        {showPreviewButton && (
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-6 justify-center">
              <IconButton
                onClick={onPreview}
                icon={<Expand size={20} className="text-gray-600" />}
              />
            </div>
          </div>
        )}
      </div>

      {/* Color selector */}
      {showColorSelector && uniqueColors.length > 1 && (
        <div className="flex space-x-2 p-1 overflow-x-auto">
          {uniqueColors.map((colorValue) => (
            <button
              key={colorValue}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(colorValue);
              }}
              className={`
                h-6 w-6 rounded-full border
                ${
                  selectedColor === colorValue
                    ? 'ring-2 ring-offset-1 ring-primary'
                    : 'opacity-70'
                }
              `}
              style={{ backgroundColor: colorValue }}
            />
          ))}
        </div>
      )}

      {/* Name & Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        {data.description && (
          <p className="text-sm text-gray-500">{data.description}</p>
        )}
      </div>

      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency value={selectedVariant.price} />
      </div>
    </div>
  );
};

export default ProductCard;

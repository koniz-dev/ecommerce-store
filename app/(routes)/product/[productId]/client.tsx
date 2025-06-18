'use client';

import { useState, useEffect } from 'react';
import { ProductInfo, ProductVariant } from '@/types';
import Gallery from '@/components/gallery';
import Info from '@/components/info';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';

interface ProductClientProps {
  product: ProductInfo;
  relatedProducts: any[];
}

const ProductClient: React.FC<ProductClientProps> = ({
  product,
  relatedProducts,
}) => {
  const [currentVariant, setCurrentVariant] = useState<ProductVariant | null>(
    null,
  );

  useEffect(() => {
    const defaultVariant = product.variants.find(
      (v) => v.id === product.selectedVariantId,
    );
    setCurrentVariant(defaultVariant ?? null);
  }, [product]);

  if (!currentVariant) return null;

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8 max-w-4xl">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery key={currentVariant.id} images={currentVariant.images} />

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info
                data={product}
                currentVariant={currentVariant}
                onVariantChange={setCurrentVariant}
              />
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <>
              <hr className="my-10" />
              <ProductList title="Related Items" items={relatedProducts} />
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductClient;

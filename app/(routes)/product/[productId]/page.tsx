import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';

import { ProductInfo } from '@/types';
import ProductClient from './client';

export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { productId } = await params;

  const product = await getProduct(productId);
  if (!product) return null;

  const defaultVariantId = product.variants?.[0]?.id;
  const productInfo: ProductInfo = {
    productId: product.id,
    name: product.name,
    description: product.description,
    variants: product.variants,
    selectedVariantId: defaultVariantId!,
  };

  const suggestedProducts = await getProducts({
    categoryId: product.category?.id,
  });

  const relatedProducts = suggestedProducts.filter((p) => p.id !== product.id);

  return (
    <ProductClient product={productInfo} relatedProducts={relatedProducts} />
  );
};

export default ProductPage;

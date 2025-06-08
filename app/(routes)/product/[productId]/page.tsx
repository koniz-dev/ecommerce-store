import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';

import Info from '@/components/info';
import Gallery from '@/components/gallery';
import Container from '@/components/ui/container';
import ProductList from '@/components/product-list';
import { Product } from '@/types';

export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

const ProductPage: React.FC<ProductPageProps> = async props => {
  const params = await props.params;
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });
  console.log("🚀 ~ suggestedProducts:", suggestedProducts)

  if (!product) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>

          <hr className="my-10" />

          <ProductList title="Related Items" items={suggestedProducts.filter((_product: Product) => _product.id !== product.id)} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;

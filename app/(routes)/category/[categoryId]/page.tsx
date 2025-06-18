import Container from '@/components/ui/container';
import Billboard from '@/components/ui/billboard';
import NoResults from '@/components/ui/no-results';

import getCategory from '@/actions/get-category';
import getProducts from '@/actions/get-products';

import ProductCard from '@/components/ui/product-card';

export const revalidate = 0;

interface Props {
  params: Promise<{ categoryId: string }>;
}

const CategoryPage = async ({ params }: Props) => {
  const { categoryId } = await params;

  const [category, products] = await Promise.all([
    getCategory(categoryId),
    getProducts({ categoryId }),
  ]);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />

        <div className="flex flex-col gap-y-8 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {products.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;

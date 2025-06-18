import { Product } from '@/types';
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        categoryId: query.categoryId,
        isFeatured: query.isFeatured,
      },
    });

    const res = await fetch(url);

    if (!res.ok) {
      console.error('Failed to fetch products:', await res.text());
      return [];
    }

    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error in getProducts:', error);
    return [];
  }
};

export default getProducts;

import { Category } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(URL);

    if (!res.ok) {
      console.error('Failed to fetch categories:', await res.text());
      return [];
    }

    const data: Category[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
};

export default getCategories;


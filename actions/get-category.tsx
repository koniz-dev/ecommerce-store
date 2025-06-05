import { Category } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category | null> => {
  try {
    const res = await fetch(`${URL}/${id}`);

    if (!res.ok) {
      console.error(`Failed to fetch category ${id}:`, await res.text());
      return null;
    }

    const data: Category = await res.json();
    return data;
  } catch (error) {
    console.error('Error in getCategory:', error);
    return null;
  }
};

export default getCategory;

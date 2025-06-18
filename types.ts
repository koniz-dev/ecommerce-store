export interface Product {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'archived';
  isFeatured: boolean;
  category: Category;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  color: Color;
  size: Size;
  status: 'active' | 'disabled' | 'discontinued';
  price: number;
  stock: number;
  sku?: string;
  images: Image[];
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: string;
  url: string;
  variantId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
  createdAt: string;
  updatedAt: string;
}

export interface Size {
  id: string;
  label: string;
  guideImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  price: number;
  image: string;
  size: Size;
  color: Color;
  quantity: number;
}

export interface ProductInfo {
  productId: string;
  name: string;
  description?: string;
  variants: ProductVariant[];
  selectedVariantId: string;
}

import Image from 'next/image';
import { X } from 'lucide-react';

import IconButton from '@/components/ui/icon-button';
import useCart from '@/hooks/use-cart';
import CartItemInfo from './cart-item-info';
import { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const removeItem = useCart((state) => state.removeItem);

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={item.image}
          alt={item.name}
          className="object-cover object-center"
        />
      </div>

      <div className="relative ml-4 flex flex-1 justify-between sm:ml-6">
        <div>
          <CartItemInfo item={item} />
        </div>

        <div className="absolute top-0 right-0">
          <IconButton
            onClick={() => removeItem(item.variantId)}
            icon={<X size={15} />}
          />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
